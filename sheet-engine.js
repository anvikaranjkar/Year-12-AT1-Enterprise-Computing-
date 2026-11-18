/* Dependency-free teaching spreadsheet engine: no eval, dynamic code or network.
 * new SheetEngine(activeCells, {sheets: {ClassA: {...}, Summary: {...}}, activeSheet: 'Summary'})
 * shares the supplied workbook map. .cells gets/sets the current sheet's raw cells;
 * .sheets is the workbook map; .sheetName identifies the current sheet.
 * get/raw/set accept A1 or sheet-qualified references. fill(source,target) adjusts
 * relative references while preserving quoted text, sheet names and $ locks.
 * hiddenRows is a Set of filtered, 1-based rows on the current sheet.
 * MATCH and XLOOKUP support exact matching; SUBTOTAL supports 1/9/101/109.
 */
(function (root) {
  'use strict';
  const ERRORS = /^#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A|CYCLE!|NUM!)$/;
  const isError = value => typeof value === 'string' && ERRORS.test(value);
  const fail = message => { throw new Error(message); };
  const check = value => { if (isError(value)) fail(value); return value; };
  const own = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);
  const scalar = value => value && value.range ? value.values[0][0] : value;
  const flat = value => value && value.range ? value.values.flat() : Array.isArray(value) ? value.flatMap(flat) : [value];
  const numeric = value => {
    check(value);
    if (value == null || value === '') return 0;
    const n = Number(value);
    if (!Number.isFinite(n)) fail('#VALUE!');
    return n;
  };
  const logical = value => {
    check(value);
    if (typeof value === 'string' && value !== '' && !Number.isFinite(Number(value))) {
      if (value.toUpperCase() === 'TRUE') return true;
      if (value.toUpperCase() === 'FALSE') return false;
      fail('#VALUE!');
    }
    return !!numeric(value);
  };
  const text = value => {
    check(value);
    return typeof value === 'boolean' ? value ? 'TRUE' : 'FALSE' : String(value ?? '');
  };
  const equal = (a, b) => typeof a === 'string' && typeof b === 'string' ? a.toLowerCase() === b.toLowerCase() : a === b;
  function compare(a, b, op) {
    check(a); check(b);
    if (a === '' && typeof b === 'number') a = 0;
    if (b === '' && typeof a === 'number') b = 0;
    if (typeof a === 'string') a = a.toLowerCase();
    if (typeof b === 'string') b = b.toLowerCase();
    return op === '=' ? equal(a, b) : op === '<>' ? !equal(a, b) : op === '<' ? a < b : op === '>' ? a > b : op === '<=' ? a <= b : a >= b;
  }
  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  function criterion(value) {
    check(value);
    if (typeof value !== 'string') return candidate => compare(candidate, value, '=');
    const parts = value.match(/^(<=|>=|<>|=|<|>)(.*)$/);
    const op = parts ? parts[1] : '=', source = parts ? parts[2] : value;
    const target = source.trim() !== '' && Number.isFinite(Number(source)) ? Number(source) : source;
    if ((op === '=' || op === '<>') && /[*?~]/.test(source)) {
      let pattern = '';
      for (let i = 0; i < source.length; i++) {
        const ch = source[i];
        if (ch === '~' && i + 1 < source.length) pattern += escapeRegex(source[++i]);
        else if (ch === '*') pattern += '.*';
        else if (ch === '?') pattern += '.';
        else pattern += escapeRegex(ch);
      }
      const regex = new RegExp('^' + pattern + '$', 'i');
      return candidate => op === '=' ? regex.test(String(check(candidate))) : !regex.test(String(check(candidate)));
    }
    return candidate => compare(candidate, target, op);
  }

  // Reference tokens retain address offsets so fill never edits a sheet name or
  // a string that happens to contain an address such as "A1" or 'Class A1'.
  function tokenize(source) {
    const tokens = []; let i = 0;
    while (i < source.length) {
      const rest = source.slice(i); let match;
      if (/^\s/.test(rest)) { i++; continue; }
      if (rest[0] === '"') {
        let value = '', closed = false; i++;
        while (i < source.length) {
          if (source[i] === '"') {
            if (source[i + 1] === '"') { value += '"'; i += 2; }
            else { i++; closed = true; break; }
          } else value += source[i++];
        }
        if (!closed) fail('#VALUE!');
        tokens.push({type: 'literal', value}); continue;
      }
      // A qualifier comes before the ordinary A1 lexer, allowing Sheet1!A1.
      match = rest.match(/^(?:'((?:[^']|'')+)'|([A-Za-z_][A-Za-z0-9_.]*))!(\$?[A-Za-z]{1,3}\$?[1-9]\d*)\b/);
      if (match) {
        const address = match[3], sheet = match[1] == null ? match[2] : match[1].replace(/''/g, "'");
        tokens.push({type: 'ref', value: address.replace(/\$/g, '').toUpperCase(), sheet, addressStart: i + match[0].length - address.length, end: i + match[0].length});
        i += match[0].length; continue;
      }
      if ((match = rest.match(/^(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?/))) {
        tokens.push({type: 'literal', value: Number(match[0])}); i += match[0].length; continue;
      }
      if ((match = rest.match(/^\$?[A-Za-z]{1,3}\$?[1-9]\d*\b/))) {
        tokens.push({type: 'ref', value: match[0].replace(/\$/g, '').toUpperCase(), sheet: null, addressStart: i, end: i + match[0].length});
        i += match[0].length; continue;
      }
      if ((match = rest.match(/^[A-Za-z_][A-Za-z_0-9.]*/))) {
        tokens.push({type: 'name', value: match[0].toUpperCase()}); i += match[0].length; continue;
      }
      if ((match = rest.match(/^(?:<=|>=|<>|[+\-*/^&=<>:,()%])/))) {
        tokens.push({type: match[0]}); i += match[0].length; continue;
      }
      if ((match = rest.match(/^#(?:REF!|DIV\/0!|VALUE!|NAME\?|N\/A|CYCLE!|NUM!)/))) {
        tokens.push({type: 'literal', value: match[0]}); i += match[0].length; continue;
      }
      fail('#VALUE!');
    }
    tokens.push({type: 'eof'}); return tokens;
  }
  class Parser {
    constructor(source) { this.tokens = tokenize(source); this.pos = 0; }
    peek(type) { return this.tokens[this.pos].type === type; }
    take(type) { if (!this.peek(type)) fail('#VALUE!'); return this.tokens[this.pos++]; }
    parse() { const ast = this.binary(0); this.take('eof'); return ast; }
    binary(level) {
      const groups = [['=', '<>', '<', '>', '<=', '>='], ['&'], ['+', '-'], ['*', '/'], ['^']];
      if (level === groups.length) return this.unary();
      let a = this.binary(level + 1);
      while (groups[level].includes(this.tokens[this.pos].type)) {
        const op = this.tokens[this.pos++].type;
        a = {type: 'binary', op, a, b: this.binary(op === '^' ? level : level + 1)};
      }
      return a;
    }
    unary() {
      if (this.peek('+') || this.peek('-')) { const op = this.tokens[this.pos++].type; return {type: 'unary', op, a: this.unary()}; }
      let a = this.atom();
      while (this.peek('%')) { this.pos++; a = {type: 'binary', op: '/', a, b: {type: 'literal', value: 100}}; }
      return a;
    }
    atom() {
      if (this.peek('literal')) return this.take('literal');
      if (this.peek('ref')) {
        const start = this.take('ref');
        if (!this.peek(':')) return start;
        this.pos++; const end = this.take('ref');
        if (end.sheet && (!start.sheet || start.sheet.toLowerCase() !== end.sheet.toLowerCase())) fail('#REF!');
        return {type: 'range', start: start.value, end: end.value, sheet: start.sheet};
      }
      if (this.peek('name')) {
        const name = this.take('name').value;
        if (this.peek('(')) {
          this.pos++; const args = [];
          if (!this.peek(')')) do { args.push(this.binary(0)); if (!this.peek(',')) break; this.pos++; } while (true);
          this.take(')'); return {type: 'call', name, args};
        }
        if (name === 'TRUE' || name === 'FALSE') return {type: 'literal', value: name === 'TRUE'};
        return {type: 'unknown'};
      }
      if (this.peek('(')) { this.pos++; const ast = this.binary(0); this.take(')'); return ast; }
      fail('#VALUE!');
    }
  }

  class SheetEngine {
    constructor(cells = {}, options = {}) {
      this.sheets = options.sheets && typeof options.sheets === 'object' ? options.sheets : {};
      const requested = String(options.activeSheet || Object.keys(this.sheets)[0] || 'Sheet1');
      this.sheetName = Object.keys(this.sheets).find(name => name.toLowerCase() === requested.toLowerCase()) || requested;
      // Keep workbook-backed object identity, so edits made through another
      // SheetEngine instance or the shared map are visible without a cache.
      if (options.sheets) this.sheets[this.sheetName] = cells;
      else this.sheets[this.sheetName] = {...cells};
      for (const name of Object.keys(this.sheets)) this.sheets[name] = this.normalise(this.sheets[name]);
      this.hiddenRows = new Set();
      this.hiddenRowsBySheet = options.hiddenRowsBySheet || {};
    }
    normalise(cells) {
      if (!cells || typeof cells !== 'object' || Array.isArray(cells)) return {};
      for (const key of Object.keys(cells)) {
        const clean = key.replace(/\$/g, '').toUpperCase();
        if (clean !== key) { cells[clean] = cells[key]; delete cells[key]; }
      }
      return cells;
    }
    get cells() { return this.sheets[this.sheetName]; }
    set cells(cells) { this.sheets[this.sheetName] = this.normalise(cells); }
    static letters(index) {
      let n = index + 1, result = '';
      while (n > 0) { n--; result = String.fromCharCode(65 + n % 26) + result; n = Math.floor(n / 26); }
      return result;
    }
    static refParts(ref) {
      const parts = String(ref).toUpperCase().match(/^(\$?)([A-Z]{1,3})(\$?)([1-9]\d*)$/);
      if (!parts) return null;
      let col = 0; for (const ch of parts[2]) col = col * 26 + ch.charCodeAt(0) - 64;
      const row = Number(parts[4]);
      if (col > 16384 || row > 1048576) return null;
      return {col: col - 1, row, absCol: !!parts[1], absRow: !!parts[3]};
    }
    sheet(name = this.sheetName) {
      const canonical = Object.keys(this.sheets).find(key => key.toLowerCase() === String(name).toLowerCase());
      if (canonical == null) fail('#REF!');
      return canonical;
    }
    address(ref, context = this.sheetName) {
      const match = String(ref).trim().match(/^(?:(?:'((?:[^']|'')+)'|([A-Za-z_][A-Za-z0-9_.]*))!)?(\$?[A-Za-z]{1,3}\$?[1-9]\d*)$/);
      if (!match || !SheetEngine.refParts(match[3])) fail('#REF!');
      const name = match[1] == null ? match[2] : match[1].replace(/''/g, "'");
      return {sheet: this.sheet(name ?? context), ref: match[3].replace(/\$/g, '').toUpperCase()};
    }
    rawAt(ref, sheetName) {
      const sheet = this.sheet(sheetName);
      if (!SheetEngine.refParts(ref)) fail('#REF!');
      return own(this.sheets[sheet], ref) ? this.sheets[sheet][ref] ?? '' : '';
    }
    raw(ref) { try { const address = this.address(ref); return this.rawAt(address.ref, address.sheet); } catch (error) { return isError(error.message) ? error.message : '#REF!'; } }
    set(ref, raw) {
      try { const address = this.address(ref); this.sheets[address.sheet][address.ref] = raw; return this.get(ref); }
      catch (error) { return isError(error.message) ? error.message : '#REF!'; }
    }
    get(ref) {
      try { const address = this.address(ref); return this.value(address.ref, new Set(), address.sheet); }
      catch (error) { return isError(error.message) ? error.message : '#VALUE!'; }
    }
    value(ref, stack, context = this.sheetName) {
      const sheet = this.sheet(context);
      if (!SheetEngine.refParts(ref)) fail('#REF!');
      const key = sheet.toLowerCase() + '!' + ref;
      if (stack.has(key)) fail('#CYCLE!');
      const raw = this.rawAt(ref, sheet);
      if (typeof raw !== 'string') return raw == null ? '' : raw;
      if (raw.startsWith("'")) return raw.slice(1);
      if (!raw.startsWith('=')) {
        if (raw.trim() !== '' && /^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:[Ee][+-]?\d+)?$/.test(raw.trim())) return Number(raw);
        if (/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)%$/.test(raw.trim())) return Number(raw.trim().slice(0, -1)) / 100;
        return check(raw);
      }
      stack.add(key);
      try { return scalar(this.evaluate(new Parser(raw.slice(1)).parse(), stack, sheet)); }
      finally { stack.delete(key); }
    }
    range(start, end, stack, context = this.sheetName) {
      const sheet = this.sheet(context), a = SheetEngine.refParts(start), b = SheetEngine.refParts(end);
      if (!a || !b || (Math.abs(a.row - b.row) + 1) * (Math.abs(a.col - b.col) + 1) > 100000) fail('#REF!');
      const values = [], refs = [];
      for (let row = Math.min(a.row, b.row); row <= Math.max(a.row, b.row); row++) {
        const vals = [], addresses = [];
        for (let col = Math.min(a.col, b.col); col <= Math.max(a.col, b.col); col++) {
          const ref = SheetEngine.letters(col) + row; addresses.push(ref);
          try { vals.push(this.value(ref, stack, sheet)); }
          catch (error) { vals.push(isError(error.message) ? error.message : '#VALUE!'); }
        }
        values.push(vals); refs.push(addresses);
      }
      return {range: true, values, refs, sheet};
    }
    evaluate(ast, stack, context = this.sheetName) {
      if (ast.type === 'literal') return ast.value;
      if (ast.type === 'ref') return this.value(ast.value, stack, ast.sheet ?? context);
      if (ast.type === 'range') return this.range(ast.start, ast.end, stack, ast.sheet ?? context);
      if (ast.type === 'unary') return (ast.op === '-' ? -1 : 1) * numeric(scalar(this.evaluate(ast.a, stack, context)));
      if (ast.type === 'unknown') fail('#NAME?');
      if (ast.type === 'call') return this.call(ast.name, ast.args, stack, context);
      if (ast.type === 'binary') {
        const a = check(scalar(this.evaluate(ast.a, stack, context))), b = check(scalar(this.evaluate(ast.b, stack, context)));
        if (ast.op === '&') return text(a) + text(b);
        if (['=', '<>', '<', '>', '<=', '>='].includes(ast.op)) return compare(a, b, ast.op);
        const x = numeric(a), y = numeric(b);
        if (ast.op === '/' && y === 0) fail('#DIV/0!');
        const result = ast.op === '+' ? x + y : ast.op === '-' ? x - y : ast.op === '*' ? x * y : ast.op === '/' ? x / y : x ** y;
        if (!Number.isFinite(result)) fail('#NUM!');
        return result;
      }
      fail('#VALUE!');
    }
    call(name, nodes, stack, context = this.sheetName) {
      const evaluate = index => this.evaluate(nodes[index], stack, context);
      const single = index => scalar(evaluate(index));
      const count = (min, max = min) => { if (nodes.length < min || nodes.length > max) fail('#VALUE!'); };
      const isRange = value => { if (!value || !value.range) fail('#VALUE!'); return value; };
      const sameShape = (a, b) => a.values.length === b.values.length && a.values[0].length === b.values[0].length;
      if (name === 'COUNTA') {
        count(1, 100); let result = 0;
        for (let i = 0; i < nodes.length; i++) {
          let value;
          try { value = evaluate(i); } catch (error) { if (error.message === '#CYCLE!') throw error; result++; continue; }
          if (value && value.range) {
            for (let row = 0; row < value.refs.length; row++) for (let col = 0; col < value.refs[row].length; col++) {
              if (value.values[row][col] === '#CYCLE!') fail('#CYCLE!');
              const raw = this.rawAt(value.refs[row][col], value.sheet); if (raw !== '' && raw != null) result++;
            }
          } else if (nodes[i].type === 'ref') {
            const raw = this.rawAt(nodes[i].value, nodes[i].sheet ?? context); if (raw !== '' && raw != null) result++;
          } else result++;
        }
        return result;
      }
      if (name === 'COUNTBLANK') {
        count(1); const values = flat(evaluate(0));
        if (values.includes('#CYCLE!')) fail('#CYCLE!');
        return values.filter(value => value === '' || value == null).length;
      }
      if (name === 'IF') { count(2, 3); return logical(single(0)) ? evaluate(1) : nodes[2] ? evaluate(2) : false; }
      if (name === 'IFERROR') {
        count(2);
        try { const result = evaluate(0); if (flat(result).includes('#CYCLE!')) fail('#CYCLE!'); return flat(result).some(isError) ? evaluate(1) : result; }
        catch (error) { if (error.message === '#CYCLE!') throw error; return evaluate(1); }
      }
      if (name === 'TRUE' || name === 'FALSE') { count(0); return name === 'TRUE'; }
      if (name === 'VLOOKUP') {
        count(3, 4);
        const lookup = check(single(0)), range = isRange(evaluate(1)), index = numeric(single(2)), approximate = nodes[3] ? logical(single(3)) : true;
        if (!Number.isInteger(index) || index < 1) fail('#VALUE!');
        if (index > range.values[0].length) fail('#REF!');
        let found = null;
        for (const row of range.values) {
          if (equal(check(row[0]), lookup)) { found = row; break; }
          if (approximate && compare(row[0], lookup, '<=')) found = row;
        }
        if (!found) fail('#N/A'); return check(found[index - 1]);
      }
      if (name === 'XLOOKUP') {
        count(3, 4);
        const lookup = check(single(0)), search = isRange(evaluate(1)), result = isRange(evaluate(2));
        if (!sameShape(search, result) || (search.values.length > 1 && search.values[0].length > 1)) fail('#VALUE!');
        const index = flat(search).findIndex(value => equal(check(value), lookup));
        if (index < 0) { if (nodes[3]) return evaluate(3); fail('#N/A'); }
        return check(flat(result)[index]);
      }
      if (name === 'INDEX') {
        count(2, 3); const range = isRange(evaluate(0)), row = numeric(single(1)), col = nodes[2] ? numeric(single(2)) : 1;
        if (!Number.isInteger(row) || !Number.isInteger(col) || row < 1 || col < 1 || !range.values[row - 1] || col > range.values[row - 1].length) fail('#REF!');
        return check(range.values[row - 1][col - 1]);
      }
      if (name === 'MATCH') {
        count(2, 3); const lookup = check(single(0)), range = isRange(evaluate(1)), mode = nodes[2] ? numeric(single(2)) : 1;
        if (mode !== 0 || (range.values.length > 1 && range.values[0].length > 1)) fail('#VALUE!');
        const test = typeof lookup === 'string' ? criterion(lookup) : value => equal(value, lookup);
        const index = flat(range).findIndex(value => test(check(value)));
        if (index < 0) fail('#N/A'); return index + 1;
      }
      if (['COUNTIF', 'SUMIF', 'AVERAGEIF'].includes(name)) {
        count(2, name === 'COUNTIF' ? 2 : 3);
        const checks = isRange(evaluate(0)), test = criterion(single(1)), values = nodes[2] ? isRange(evaluate(2)) : checks;
        if (!sameShape(checks, values)) fail('#VALUE!');
        let matches = 0; const numbers = [], checkValues = flat(checks), numberValues = flat(values);
        for (let i = 0; i < checkValues.length; i++) if (test(check(checkValues[i]))) {
          matches++; const value = check(numberValues[i]); if (typeof value === 'number') numbers.push(value);
        }
        if (name === 'COUNTIF') return matches;
        const sum = numbers.reduce((a, b) => a + b, 0);
        if (name === 'SUMIF') return sum;
        if (!numbers.length) fail('#DIV/0!'); return sum / numbers.length;
      }
      if (['COUNTIFS', 'SUMIFS', 'AVERAGEIFS'].includes(name)) {
        const counting = name === 'COUNTIFS', start = counting ? 0 : 1;
        count(counting ? 2 : 3, 127);
        if ((nodes.length - start) % 2 !== 0) fail('#VALUE!');
        const values = isRange(evaluate(0)), rules = [];
        for (let i = start; i < nodes.length; i += 2) {
          const range = isRange(evaluate(i)); if (!sameShape(values, range)) fail('#VALUE!');
          rules.push({values: flat(range), test: criterion(single(i + 1))});
        }
        let matches = 0; const numbers = [], source = flat(values);
        for (let i = 0; i < source.length; i++) if (rules.every(rule => rule.test(check(rule.values[i])))) {
          matches++; if (!counting) { const value = check(source[i]); if (typeof value === 'number') numbers.push(value); }
        }
        if (counting) return matches;
        const sum = numbers.reduce((a, b) => a + b, 0);
        if (name === 'SUMIFS') return sum;
        if (!numbers.length) fail('#DIV/0!'); return sum / numbers.length;
      }
      if (name === 'SUBTOTAL') {
        count(2, 30); const code = numeric(single(0)); if (![1, 9, 101, 109].includes(code)) fail('#VALUE!');
        const values = [];
        for (let i = 1; i < nodes.length; i++) {
          const range = evaluate(i);
          if (range && range.range) {
            const hidden = range.sheet === this.sheetName ? this.hiddenRows : this.hiddenRowsBySheet[range.sheet] || new Set();
            for (let row = 0; row < range.values.length; row++) for (let col = 0; col < range.values[row].length; col++) {
              const ref = range.refs[row][col];
              if (!hidden.has(SheetEngine.refParts(ref).row) && !/^=\s*SUBTOTAL\(/i.test(String(this.rawAt(ref, range.sheet)))) values.push(range.values[row][col]);
            }
          } else values.push(range);
        }
        const numbers = values.map(check).filter(value => typeof value === 'number'), sum = numbers.reduce((a, b) => a + b, 0);
        if (code === 9 || code === 109) return sum;
        if (!numbers.length) fail('#DIV/0!'); return sum / numbers.length;
      }
      const args = nodes.map(node => this.evaluate(node, stack, context));
      if (['SUM', 'AVERAGE', 'MIN', 'MAX', 'COUNT', 'MEDIAN'].includes(name)) {
        count(1, 100);
        const numbers = name === 'MEDIAN' ? args.flatMap((value, index) => {
          const items = flat(value).map(check);
          // Excel ignores text/logicals in references, but accepts numeric text
          // and logicals supplied directly as scalar MEDIAN arguments.
          return value && value.range || nodes[index].type === 'ref' ? items.filter(item => typeof item === 'number') : items.map(numeric);
        }) : args.flatMap(flat).map(check).filter(value => typeof value === 'number');
        if (name === 'COUNT') return numbers.length;
        if (name === 'SUM') return numbers.reduce((a, b) => a + b, 0);
        if (name === 'AVERAGE') { if (!numbers.length) fail('#DIV/0!'); return numbers.reduce((a, b) => a + b, 0) / numbers.length; }
        if (name === 'MEDIAN') {
          if (!numbers.length) fail('#NUM!'); numbers.sort((a, b) => a - b); const middle = Math.floor(numbers.length / 2);
          return numbers.length % 2 ? numbers[middle] : (numbers[middle - 1] + numbers[middle]) / 2;
        }
        return numbers.length ? name === 'MIN' ? Math.min(...numbers) : Math.max(...numbers) : 0;
      }
      if (name === 'AND' || name === 'OR') { count(1, 100); const values = args.flatMap(flat).map(logical); return name === 'AND' ? values.every(Boolean) : values.some(Boolean); }
      if (name === 'NOT') { count(1); return !logical(scalar(args[0])); }
      if (name === 'ROUND') {
        count(2); const value = numeric(scalar(args[0])), factor = 10 ** Math.trunc(numeric(scalar(args[1])));
        return Math.sign(value) * Math.round((Math.abs(value) + Number.EPSILON) * factor) / factor;
      }
      if (name === 'ABS') { count(1); return Math.abs(numeric(scalar(args[0]))); }
      if (name === 'CONCATENATE' || name === 'CONCAT') { count(1, 100); return args.flatMap(flat).map(text).join(''); }
      if (['TRIM', 'UPPER', 'LOWER', 'LEN'].includes(name)) {
        count(1); const value = text(scalar(args[0]));
        return name === 'TRIM' ? value.trim().replace(/ +/g, ' ') : name === 'UPPER' ? value.toUpperCase() : name === 'LOWER' ? value.toLowerCase() : Array.from(value).length;
      }
      if (name === 'LEFT' || name === 'RIGHT') {
        count(1, 2); const value = Array.from(text(scalar(args[0]))), requested = nodes[1] ? numeric(scalar(args[1])) : 1;
        if (requested < 0) fail('#VALUE!');
        const length = Math.trunc(requested);
        return name === 'LEFT' ? value.slice(0, length).join('') : length === 0 ? '' : value.slice(-length).join('');
      }
      fail('#NAME?');
    }
    fill(sourceRef, targetRef) {
      try {
        const source = this.address(sourceRef), target = this.address(targetRef), from = SheetEngine.refParts(source.ref), to = SheetEngine.refParts(target.ref);
        const raw = this.rawAt(source.ref, source.sheet);
        if (typeof raw !== 'string' || !raw.startsWith('=')) return this.set(targetRef, raw);
        let formula = raw.slice(1); const references = tokenize(formula).filter(token => token.type === 'ref');
        for (let i = references.length - 1; i >= 0; i--) {
          const token = references[i], original = formula.slice(token.addressStart, token.end), parts = SheetEngine.refParts(original);
          if (!parts) fail('#REF!');
          const col = parts.col + (parts.absCol ? 0 : to.col - from.col), row = parts.row + (parts.absRow ? 0 : to.row - from.row);
          const moved = col < 0 || col > 16383 || row < 1 || row > 1048576 ? '#REF!' : (parts.absCol ? '$' : '') + SheetEngine.letters(col) + (parts.absRow ? '$' : '') + row;
          formula = formula.slice(0, token.addressStart) + moved + formula.slice(token.end);
        }
        return this.set(targetRef, '=' + formula);
      } catch (error) { return isError(error.message) ? error.message : '#VALUE!'; }
    }
  }
  root.SheetEngine = SheetEngine;
  if (typeof module !== 'undefined' && module.exports) module.exports = SheetEngine;
})(typeof window !== 'undefined' ? window : globalThis);
