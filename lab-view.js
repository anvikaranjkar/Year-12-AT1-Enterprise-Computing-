/* Spreadsheet learning interface. renderLab(root, {state,save,toast,esc,download,chart}).
 * state.lab stores raw cells, view filters and learning progress. Sort changes the
 * view only: physical row numbers and formula references remain unchanged.
 */
(function () {
  'use strict';
  window.renderLab = function (root, ctx) {
    const {state,save,toast,esc,download,chart}=ctx;
    const lab=state.lab ||= {};
    lab.completed ||= {}; lab.help ||= {}; lab.lessonIndex ||= 0;
    lab.zone ||= ''; lab.service ||= ''; lab.sort ||= ''; lab.selected ||= 'K2';
    lab.group ||= 'B';lab.measure ||= 'E';lab.aggregate ||= 'Mean';
    lab.chartType=lab.chartType==='line'&&lab.group==='C'?'line':'bar';
    const letters=SheetEngine.letters;
    const headers=['Order','Zone','Day','Service','Minutes','Parcels','Fee','Revenue','Status','Target','Answers'];
    function initialCells() {
      const cells={};headers.forEach((v,i)=>cells[letters(i)+'1']=v);
      window.LAB_ROWS.forEach((row,r)=>row.forEach((v,c)=>cells[letters(c)+(r+2)]=v));
      cells.J2=20;return cells;
    }
    if(!lab.cells)lab.cells=initialCells();
    lab.maxRows ||=25;lab.dataEnd ||=13;
    const engine=new SheetEngine(lab.cells);
    const app=document.createElement('div');root.innerHTML='';root.append(app);
    const $=s=>app.querySelector(s), $$=s=>Array.from(app.querySelectorAll(s));
    let selected=SheetEngine.refParts(lab.selected)?lab.selected:'K2';
    let feedback='';let feedbackError=false;
    const display=v=>typeof v==='number'?Number.isInteger(v)?String(v):String(Number(v.toFixed(6))):String(v??'');
    const e=v=>esc(String(v??''));
    function persist(){lab.cells={...engine.cells};lab.selected=selected;save();}
    function lesson(){return window.LAB_LESSONS[Math.min(lab.lessonIndex,window.LAB_LESSONS.length-1)];}
    function dataRows() {
      return Array.from({length:Math.max(0,lab.dataEnd-1)},(_,i)=>i+2).filter(r=>Array.from({length:9},(_,c)=>engine.raw(letters(c)+r)).some(v=>v!==''));
    }
    function matches(r) {
      return (!lab.zone||String(engine.get('B'+r))===lab.zone)&&(!lab.service||String(engine.get('D'+r))===lab.service);
    }
    function updateHidden(){engine.hiddenRows=new Set(dataRows().filter(r=>!matches(r)));}
    function visibleRows(){return dataRows().filter(matches);}
    function orderedRows() {
      const all=Array.from({length:lab.maxRows-1},(_,i)=>i+2);
      if(!lab.sort)return all;
      const [col,dir]=lab.sort.split(':');
      const ordered=dataRows().slice().sort((a,b)=>{
        const x=engine.get(col+a),y=engine.get(col+b);
        const compare=typeof x==='number'&&typeof y==='number'?x-y:String(x).localeCompare(String(y),undefined,{numeric:true});
        return dir==='desc'?-compare:compare;
      });
      const set=new Set(ordered);return ordered.concat(all.filter(r=>!set.has(r)));
    }
    function options(col,current){const vs=[...new Set(dataRows().map(r=>String(engine.get(col+r))))].sort();return '<option value="">All</option>'+vs.map(v=>`<option value="${e(v)}" ${v===current?'selected':''}>${e(v)}</option>`).join('');}
    function gridHtml(){
      updateHidden();
      return `<table class="sheet" aria-label="Editable practice spreadsheet"><thead><tr><th aria-label="Row number"></th>${headers.map((v,c)=>`<th scope="col">${letters(c)}</th>`).join('')}</tr></thead><tbody>${[1,...orderedRows()].map(r=>`<tr ${r>1&&!matches(r)&&r<=lab.dataEnd?'hidden':''}><td class="row-num">${r}</td>${headers.map((_,c)=>{const ref=letters(c)+r,raw=engine.raw(ref),value=engine.get(ref);return `<td data-ref="${ref}" class="${ref===selected?'selected ':''}${typeof raw==='string'&&raw.startsWith('=')?'formula':''}"><input data-cell="${ref}" aria-label="Cell ${ref}${r===1?' header':''}" spellcheck="false" autocomplete="off" class="${typeof value==='number'?'numeric ':''}${r===1?'head-cell':''}" value="${e(display(value))}"></td>`}).join('')}</tr>`).join('')}</tbody></table>`;
    }
    function summaryHtml(){
      const groups=new Map();
      for(const r of visibleRows()){
        const key=display(engine.get(lab.group+r))||'(blank)',v=engine.get(lab.measure+r);
        if(!groups.has(key))groups.set(key,{count:0,nums:[]});const group=groups.get(key);group.count++;
        if(typeof v==='number'&&Number.isFinite(v))group.nums.push(v);
      }
      const days=['mon','tue','wed','thu','fri','sat','sun'];
      const rows=[...groups].sort(([a],[b])=>{
        if(lab.group==='C'){const x=days.indexOf(a.slice(0,3).toLowerCase()),y=days.indexOf(b.slice(0,3).toLowerCase());if(x>=0&&y>=0)return x-y;}
        return a.localeCompare(b);
      }).map(([key,v])=>{
        const sum=v.nums.reduce((a,b)=>a+b,0),value=lab.aggregate==='Count'?v.count:lab.aggregate==='Sum'?sum:v.nums.length?sum/v.nums.length:null;
        return {key,value,count:v.count};
      });
      const measure=engine.get(lab.measure+'1'),group=engine.get(lab.group+'1'),title=`${lab.aggregate} ${lab.aggregate==='Count'?'records':measure} by ${group}`;
      const units=lab.aggregate==='Count'?'records':lab.measure==='E'?'minutes':lab.measure==='F'?'parcels':lab.measure==='G'||lab.measure==='H'?'dollars':'units';
      return `<p class="muted">${visibleRows().length} visible records. The same zone and service filters apply. Count counts records; Mean and Sum use numerical values in the chosen column.</p>${rows.length?`<div class="table-scroll"><table class="data"><thead><tr><th>${e(group)}</th><th>${e(title)} (${units})</th><th>Records</th></tr></thead><tbody>${rows.map(r=>`<tr><td>${e(r.key)}</td><td>${r.value==null?'No numbers':e(display(r.value))}</td><td>${r.count}</td></tr>`).join('')}</tbody></table></div>${rows.some(r=>r.value!==null)?chart(rows.filter(r=>r.value!==null).map(r=>r.key),rows.filter(r=>r.value!==null).map(r=>r.value),title+' · '+units,lab.chartType):'<p>Enter numerical values in this column to create a chart.</p>'}`:'<p>No records match. Clear the filters to compare groups.</p>'}<p class="notice">Use bars to compare categories. A line connects ordered observations, so choose Day to explore a time pattern; weekdays are ordered Monday to Sunday. Imported labels need their own meaningful order. The chart shows associations, not proof of a cause.</p><p class="notice">This is a live grouped summary builder. Practise creating a real PivotTable in Excel Online too: Insert → PivotTable, put the grouping field in Rows and a numerical field in Values, then choose Sum, Average or Count.</p>`;
    }
    function draw(){
      updateHidden();const l=lesson(),help=lab.help[l.id]||{},done=Object.values(lab.completed).filter(Boolean).length;
      app.innerHTML=`<div class="page-head"><p class="eyebrow">LEARN BY DOING</p><h1>Your spreadsheet lab.</h1><p class="intro">Type real formulas, change data and see results update. Start with lesson 1, then repeat each skill in Microsoft Excel Online, the software named in your assessment.</p><p class="mobile-note">Swipe the grid horizontally on a phone. A laptop is recommended for practical rehearsal.</p></div>
      <div class="lab-layout"><aside class="lesson-panel card"><label class="field">Guided lesson<select id="lab-lesson">${window.LAB_LESSONS.map((v,i)=>`<option value="${i}" ${i===lab.lessonIndex?'selected':''}>${lab.completed[v.id]?'✓ ':''}${e(v.title)}</option>`).join('')}</select></label><h2>${e(l.title)}</h2><div><span class="tag">${e(l.skill)}</span><p style="margin-top:16px">${e(l.task)}</p><p>Answer cell: <code>${e(l.cell)}</code></p><button class="btn accent" data-action="check">Check my work</button><div id="lesson-feedback" role="status" class="${feedback?'feedback'+(feedbackError?' error':''):'hidden'}">${feedback}</div></div><div><details id="lab-hint" ${help.hint?'open':''}><summary>Show a hint</summary><p>${e(l.hint)}</p></details><details id="lab-solution" ${help.revealed?'open':''}><summary>Worked solution</summary><p><code>${e(l.solution)}</code></p><p>${e(l.why)}</p><p class="muted">Work checked after viewing help is recorded as guided practice. Use a fresh, changed example without help to check independent mastery.</p></details><div class="row" style="margin-top:16px"><button class="btn secondary small" data-action="previous" ${lab.lessonIndex===0?'disabled':''}>Previous</button><button class="btn secondary small" data-action="next" ${lab.lessonIndex===window.LAB_LESSONS.length-1?'disabled':''}>Next lesson</button></div><p class="notice">${done} / ${window.LAB_LESSONS.length} lessons checked. ${Object.values(lab.completed).filter(v=>v==='independent').length} without opening help.</p></div></aside>
      <section><div class="sheet-card"><div class="sheet-toolbar"><strong>Dispatch practice</strong><label>Zone <select id="zone-filter">${options('B',lab.zone)}</select></label><label>Service <select id="service-filter">${options('D',lab.service)}</select></label><button class="btn secondary small" data-action="clear-filters">Clear filters</button><span id="record-count">${visibleRows().length} / ${dataRows().length} records</span></div><div class="sheet-toolbar"><label>Sort view <select id="sort-view"><option value="">Original row order</option>${[['A:asc','Order A → Z'],['B:asc','Zone A → Z'],['E:asc','Minutes low → high'],['E:desc','Minutes high → low'],['F:desc','Parcels high → low']].map(([v,t])=>`<option value="${v}" ${lab.sort===v?'selected':''}>${t}</option>`).join('')}</select></label><label>Fill through <input id="fill-target" placeholder="e.g. I13" aria-label="Last cell for fill down"></label><button class="btn secondary small" data-action="fill">Fill down</button><button class="btn secondary small" data-action="clear-cell">Clear cell</button></div><div class="formula-row"><input id="cell-ref" aria-label="Selected cell address" value="${e(selected)}" spellcheck="false"><span aria-hidden="true">ƒx</span><input id="formula-input" aria-label="Formula for selected cell ${e(selected)}" spellcheck="false" value="${e(engine.raw(selected))}"><button class="btn secondary small" data-action="apply">Apply</button></div><div id="grid-wrap">${gridHtml()}</div><div class="sheet-tabs"><span>Dispatch</span><span>Saved on this browser · 11 columns · ${lab.maxRows} rows</span></div></div>
      <p class="notice">Click a cell to edit its raw value or formula. Enter saves and moves down; Tab moves right; arrow keys move between cells. Paste tab-separated cells from Excel. Green corner = formula. The view can be sorted without moving cell addresses: row numbers retain their original identity. Excel’s actual Sort moves whole records, so select the whole table there.</p><div class="row"><button class="btn secondary small" data-action="export-csv">Export values CSV</button><label class="btn secondary small" for="import-csv">Import CSV</label><input type="file" id="import-csv" accept=".csv,text/csv" class="hidden"><button class="btn secondary small" data-action="reset">Reset dataset</button></div>${lab.imported?'<div class="callout warning">Custom data loaded. Guided lessons use the original dispatch dataset. Reset dataset before checking a lesson. Imported formulas use only this app’s supported single-sheet functions.</div>':''}</section></div>
      <section class="card" style="margin-top:24px"><h2>Group, summarise, compare.</h2><p class="muted">Build a summary using the visible records. Change the filters above and compare the result.</p><div class="pivot-controls"><label class="field">Group by<select id="group-field">${['B','C','D'].map(v=>`<option value="${v}" ${lab.group===v?'selected':''}>${e(v+' · '+engine.get(v+'1'))}</option>`).join('')}</select></label><label class="field">Numerical field<select id="measure-field">${['E','F','G','H'].map(v=>`<option value="${v}" ${lab.measure===v?'selected':''}>${e(v+' · '+engine.get(v+'1'))}</option>`).join('')}</select></label><label class="field">Summarise with<select id="aggregate-field">${['Mean','Sum','Count'].map(v=>`<option ${lab.aggregate===v?'selected':''}>${v}</option>`).join('')}</select></label><label class="field">Chart type<select id="chart-type"><option value="bar" ${lab.chartType==='bar'?'selected':''}>Bar · categories</option><option value="line" ${lab.chartType==='line'?'selected':''}>Line · ordered days</option></select></label></div><div id="group-summary">${summaryHtml()}</div></section>
      <details class="card" style="margin-top:20px"><summary>Formula help and practice limits</summary><p>Supported: arithmetic <code>+ - * / ^</code>, percentages, comparisons, <code>&amp;</code>, ranges, <code>$</code> references, SUM, AVERAGE, MIN, MAX, COUNT, COUNTA, COUNTIF, SUMIF, AVERAGEIF, IF, AND, OR, NOT, ROUND, IFERROR, VLOOKUP, INDEX, MATCH, CONCATENATE, CONCAT, TRIM, UPPER, LOWER and SUBTOTAL.</p><p>Use commas between arguments and straight double quotes around text. Example: <code>=AVERAGEIF(B2:B13,"North",E2:E13)</code>. VLOOKUP with FALSE is exact; MATCH supports exact mode 0. SUBTOTAL 9/109 totals visible rows and 1/101 averages them; SUM and AVERAGE include filtered records.</p><p>This is a focused learning grid, with single-sheet references and a subset of Excel. It does not reproduce Excel’s entire calculation engine, formatting, chart editing, PivotTable interface or date handling. CSV contains current values, not formulas. Use the app’s backup feature to retain raw formulas and progress.</p><p>CSV text beginning with a spreadsheet command character is escaped on export. Imports are limited to 100 data rows and 11 columns. No file data is sent to a server by this lab.</p></details>`;
      bindDetails();
    }
    function bindDetails(){
      for(const [id,key]of [['lab-hint','hint'],['lab-solution','revealed']])$("#"+id).addEventListener('toggle',ev=>{if(ev.target.open){(lab.help[lesson().id] ||= {})[key]=true;persist();}});
    }
    function syncValues(){
      updateHidden();
      for(const input of $$('[data-cell]')){
        const ref=input.dataset.cell,value=engine.get(ref);
        if(document.activeElement!==input)input.value=display(value);
        input.classList.toggle('numeric',typeof value==='number');
        input.closest('td').classList.toggle('formula',String(engine.raw(ref)).startsWith('='));
      }
      const count=$('#record-count');if(count)count.textContent=`${visibleRows().length} / ${dataRows().length} records`;
      const summary=$('#group-summary');if(summary)summary.innerHTML=summaryHtml();
    }
    function select(ref,focus=true){
      const input=$(`[data-cell="${ref}"]`);if(!input)return;
      selected=ref;lab.selected=ref;
      $$('td.selected').forEach(td=>td.classList.remove('selected'));input.closest('td').classList.add('selected');
      $('#cell-ref').value=ref;$('#formula-input').value=String(engine.raw(ref));
      $('#formula-input').setAttribute('aria-label','Formula for selected cell '+ref);
      if(focus){input.focus();input.value=String(engine.raw(ref));input.select();input.scrollIntoView({block:'nearest',inline:'nearest'});}
    }
    function commit(ref,raw){engine.set(ref,raw);persist();syncValues();}
    function checkLesson(){
      const l=lesson(),raw=String(engine.raw(l.cell)).toUpperCase(),value=engine.get(l.cell);
      const correctValue=typeof l.value==='number'?typeof value==='number'&&Math.abs(value-l.value)<.00001:String(value).toLowerCase()===String(l.value).toLowerCase();
      const needed={s1:raw.startsWith('=')&&/E2\b/.test(raw),s2:/F2\b/.test(raw)&&/G2\b/.test(raw)&&raw.includes('*'),s3:/\bSUM\s*\(/.test(raw),s4:/\bIF\s*\(/.test(raw)&&raw.includes('$J$2'),s5:/\bIF\s*\(/.test(raw)&&raw.includes('$J$2')&&/E13\b/.test(raw),s6:lab.zone==='North'&&lab.service==='Express',s7:/\bSUBTOTAL\s*\(/.test(raw)&&lab.zone==='North'&&lab.service==='Express',s8:/\bAVERAGEIF\s*\(/.test(raw),s9:/\bCOUNTIF\s*\(/.test(raw),s10:/\bIF\s*\(/.test(raw)&&raw.includes('<='),s11:/\bIF\s*\(/.test(raw)&&/\bAND\s*\(/.test(raw),s12:/\bVLOOKUP\s*\(/.test(raw)&&/,\s*(FALSE|0)\s*\)/.test(raw),s13:/\bINDEX\s*\(/.test(raw)&&/\bMATCH\s*\(/.test(raw)&&/,\s*0\s*\)/.test(raw),s14:(raw.match(/\bAVERAGEIF\s*\(/g)||[]).length>=2&&raw.includes('-'),s15:/\bSUMIF\s*\(/.test(raw)};
      if(lab.imported){feedbackError=true;feedback='Reset the original dataset first. These questions use the original column layout and records.';}
      else if(correctValue&&needed[l.id]){
        const helped=lab.help[l.id]?.hint||lab.help[l.id]?.revealed;
        lab.completed[l.id]=helped?'guided':'independent';feedbackError=false;
        feedback=`<strong>Correct${helped?' · guided practice':''}.</strong> ${e(l.why)} ${helped?'Repeat this skill with changed numbers in Excel Online without opening help.':''}`;
      }else{(lab.help[l.id] ||= {}).hint=true;feedbackError=true;feedback=`<strong>Keep going.</strong> ${!correctValue?`${e(l.cell)} currently returns ${e(display(value)||'a blank')}. Check the records, range and units. `:'The value is right. Use the requested formula or filter method to show the skill. '}For this task: ${e(l.hint)}`;}
      persist();draw();
    }
    function exportCSV(){
      const rows=[];for(let r=1;r<=lab.dataEnd;r++)rows.push(Array.from({length:11},(_,c)=>{
        const value=engine.get(letters(c)+r);let text=String(value??'');
        if(typeof value==='string'&&/^[\s]*[=+\-@\t\r]/.test(text))text="'"+text;
        return /[",\n\r]/.test(text)?'"'+text.replace(/"/g,'""')+'"':text;
      }).join(','));
      download('dispatch-practice-values.csv',rows.join('\r\n'),'text/csv;charset=utf-8');toast('CSV exported with current values. Raw formulas remain in your app backup.');
    }
    function parseCSV(text){
      const rows=[];let row=[],cell='',quoted=false;
      text=text.replace(/^\uFEFF/,'');
      for(let i=0;i<text.length;i++){
        const c=text[i];
        if(c==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else if(quoted||cell==='')quoted=!quoted;else cell+=c;}
        else if(c===','&&!quoted){row.push(cell);cell='';}
        else if((c==='\n'||c==='\r')&&!quoted){if(c==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v!==''))rows.push(row);row=[];cell='';}
        else cell+=c;
      }
      if(quoted)throw Error('A quoted CSV field is unfinished.');
      row.push(cell);if(row.some(v=>v!==''))rows.push(row);return rows;
    }
    app.addEventListener('focusin',ev=>{const input=ev.target.closest('[data-cell]');if(input){select(input.dataset.cell,false);input.value=String(engine.raw(input.dataset.cell));}});
    app.addEventListener('focusout',ev=>{const input=ev.target.closest('[data-cell]');if(input){commit(input.dataset.cell,input.value);input.value=display(engine.get(input.dataset.cell));}else if(ev.target.id==='formula-input'){commit(selected,ev.target.value);}});
    app.addEventListener('input',ev=>{if(ev.target.matches('[data-cell]'))$('#formula-input').value=ev.target.value;});
    app.addEventListener('keydown',ev=>{
      if(ev.target.id==='cell-ref'&&ev.key==='Enter'){ev.preventDefault();const ref=ev.target.value.trim().toUpperCase(),p=SheetEngine.refParts(ref);if(p&&p.col<=10&&p.row<=lab.maxRows)select(ref);else toast('Choose A1 through K'+lab.maxRows+'.');return;}
      if(ev.target.id==='formula-input'&&ev.key==='Enter'){ev.preventDefault();commit(selected,ev.target.value);select(selected);return;}
      const input=ev.target.closest('[data-cell]');if(!input)return;
      const parts=SheetEngine.refParts(input.dataset.cell);
      if(ev.key==='Escape'){input.value=String(engine.raw(input.dataset.cell));input.blur();return;}
      const moves={Enter:[0,ev.shiftKey?-1:1],Tab:[ev.shiftKey?-1:1,0],ArrowUp:[0,-1],ArrowDown:[0,1],ArrowLeft:[-1,0],ArrowRight:[1,0]};
      if(!moves[ev.key])return;
      ev.preventDefault();commit(input.dataset.cell,input.value);
      const [dc,dr]=moves[ev.key];let row=parts.row+dr,col=parts.col+dc;
      if(col>10){col=0;row++;}if(col<0){col=10;row--;}
      row=Math.max(1,Math.min(lab.maxRows,row));
      while(engine.hiddenRows.has(row)&&row>1&&row<lab.maxRows)row+=dr<0?-1:1;
      select(letters(col)+Math.max(1,Math.min(lab.maxRows,row)));
    });
    app.addEventListener('paste',ev=>{
      const input=ev.target.closest('[data-cell]');if(!input)return;
      const text=ev.clipboardData?.getData('text/plain');if(!text||!/[\t\n\r]/.test(text))return;
      ev.preventDefault();const start=SheetEngine.refParts(input.dataset.cell),rows=text.replace(/\r\n/g,'\n').replace(/\r/g,'\n').replace(/\n$/,'').split('\n');
      if(rows.length>101){toast('Paste at most 101 rows, including a header.');return;}
      rows.forEach((line,i)=>line.split('\t').slice(0,11-start.col).forEach((v,c)=>{const r=start.row+i;if(r<=101)engine.set(letters(start.col+c)+r,v);}));
      lab.maxRows=Math.min(101,Math.max(lab.maxRows,start.row+rows.length-1));
      lab.dataEnd=Math.max(lab.dataEnd,Math.min(101,start.row+rows.length-1));persist();draw();select(letters(start.col)+start.row);toast('Pasted cells. Check headings and row alignment.');
    });
    app.addEventListener('change',async ev=>{
      const id=ev.target.id,value=ev.target.value;
      if(id==='lab-lesson'){lab.lessonIndex=Number(value);feedback='';persist();draw();select(lesson().cell);}
      else if(['zone-filter','service-filter','sort-view'].includes(id)){lab[id==='zone-filter'?'zone':id==='service-filter'?'service':'sort']=value;persist();draw();}
      else if(['group-field','measure-field','aggregate-field','chart-type'].includes(id)){
        lab[id==='group-field'?'group':id==='measure-field'?'measure':id==='chart-type'?'chartType':'aggregate']=value;
        if(lab.chartType==='line'&&lab.group!=='C'){lab.chartType='bar';toast('Choose Day as the grouping field before using a line chart.');}
        $('#chart-type').value=lab.chartType;persist();$('#group-summary').innerHTML=summaryHtml();
      }
      else if(id==='import-csv'){
        const file=ev.target.files[0];if(!file)return;
        if(file.size>500000){toast('Use a CSV file smaller than 500 KB.');return;}
        try{
          const rows=parseCSV(await file.text());
          if(rows.length<2)throw Error('Include a header row and at least one data row.');
          if(rows.length>101||rows.some(r=>r.length>11))throw Error('Maximum 100 data rows and 11 columns.');
          if(!confirm('Replace this practice grid with the CSV? Your lesson progress will stay.'))return;
          engine.cells={};rows.forEach((row,r)=>row.forEach((v,c)=>engine.set(letters(c)+(r+1),v)));
          lab.maxRows=Math.max(25,rows.length);lab.dataEnd=rows.length;lab.imported=true;lab.zone='';lab.service='';lab.sort='';selected='A1';feedback='';persist();draw();toast('CSV imported. Reset dataset to return to guided lessons.');
        }catch(error){toast(error.message||'Could not read this CSV.');}
      }
    });
    app.addEventListener('click',ev=>{
      const action=ev.target.closest('[data-action]')?.dataset.action;if(!action)return;
      if(action==='apply'){commit(selected,$('#formula-input').value);select(selected);}
      if(action==='check')checkLesson();
      if(action==='next'||action==='previous'){lab.lessonIndex=Math.max(0,Math.min(window.LAB_LESSONS.length-1,lab.lessonIndex+(action==='next'?1:-1)));feedback='';persist();draw();select(lesson().cell);}
      if(action==='clear-filters'){lab.zone='';lab.service='';persist();draw();}
      if(action==='clear-cell'){commit(selected,'');select(selected);}
      if(action==='fill'){
        const target=$('#fill-target').value.trim().toUpperCase(),a=SheetEngine.refParts(selected),b=SheetEngine.refParts(target);
        if(!b||b.col!==a.col||b.row<a.row||b.row>101){toast('Choose a cell in the same column, below the selected cell, up to row 101.');return;}
        for(let row=a.row+1;row<=b.row;row++)engine.fill(selected,letters(a.col)+row);
        lab.maxRows=Math.max(lab.maxRows,b.row);persist();draw();select(selected);toast('Filled down. Inspect the references in the last cell.');
      }
      if(action==='export-csv')exportCSV();
      if(action==='reset'){
        if(!confirm('Reset every grid value and formula to the original dispatch data? Checked lessons remain saved.'))return;
        engine.cells=initialCells();lab.maxRows=25;lab.dataEnd=13;lab.imported=false;lab.zone='';lab.service='';lab.sort='';selected=lesson().cell;feedback='';persist();draw();toast('Original dataset restored.');
      }
    });
    draw();persist();
  };
})();
