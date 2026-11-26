const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
global.window=global;
require('./saved-booklets.js');require('./resource-links.js');
const S=SavedBooklets;
let d=S.normalise();
assert.equal(d.books[0].title,'My revision booklet');assert.equal(d.active,d.books[0].id);assert.deepEqual(d.items,[]);
const first=S.add(d,{kind:'highlight',bookId:d.active,text:'AVERAGEIF',sourceKey:'notes:formulas',sourceHash:'#notes/formulas',title:'Formulas',start:4,end:13});
assert(first.created);assert.equal(d.items.length,1);
assert.equal(S.add(d,{...first.item,id:undefined}).created,false,'Same source passage is not duplicated in one booklet');
d.books.push({id:'second',title:'My formulas'});
assert(S.add(d,{...first.item,id:'separate',bookId:'second'}).created,'Same passage can belong to a different booklet');
d.items[0].annotation='Explain the criterion and the average range.';
const roundtrip=S.normalise(JSON.parse(JSON.stringify(d)));
assert.equal(roundtrip.items[0].annotation,d.items[0].annotation);assert.equal(roundtrip.books.length,2);
const text='Use AVERAGEIF to calculate a conditional mean.';
assert.equal(S.anchors(text,d.items).length,2);assert.equal(S.anchors('The note has changed.',d.items).length,0,'Never colour an unrelated passage after a content update');
const more=[{...first.item,id:'a',text:text.slice(0,8),start:0,end:8},{...first.item,id:'b',text:text.slice(4,13),start:4,end:13}];
assert.deepEqual(S.segments(text,more).map(x=>[x.start,x.end,x.items.length]),[[0,4,1],[4,8,2],[8,13,1]],'Overlapping highlights retain both saved entries');
const imported=S.normalise({books:[],active:'missing',items:[{id:'x',text:'<img src=x onerror=alert(1)>',kind:'bad',sourceHash:'javascript:alert(1)',bookId:'missing',colour:'unknown'}]});
assert.equal(imported.items[0].sourceHash,'');assert.equal(imported.items[0].bookId,imported.active);assert.equal(imported.items[0].kind,'custom');assert.equal(imported.items[0].colour,'yellow');
assert.equal(imported.items[0].text,'<img src=x onerror=alert(1)>','Stored content remains text for escaped rendering');
assert.equal(S.anchors('nothing',imported.items).length,0);
assert.equal(Object.keys(SOURCE_DOCUMENTS).length,13);for(const [file,url]of Object.entries(SOURCE_DOCUMENTS)){assert(/\.(pdf|png|zip)$/.test(file));const u=new URL(url);assert.equal(u.hostname,'chatgpt.com');assert.match(u.searchParams.get('file_id'),/^libfile_[a-f0-9]+$/);}
const files=[];function walk(dir){for(const e of fs.readdirSync(dir,{withFileTypes:true})){if(e.name.startsWith('.'))continue;const f=path.join(dir,e.name);if(e.isDirectory())walk(f);else files.push(f);}}walk('.');
for(const f of files){assert(fs.statSync(f).size<200000,'Unexpected large deployment file: '+f);assert(!/\.(pdf|png|zip)$/.test(f),'Large source accidentally included: '+f);}
const app=fs.readFileSync('app.js','utf8');assert(app.includes("KEY='enterprise-studio-v1'"));assert(app.includes('savedBooklets:{}'));assert(app.includes("['booklets','▱','Booklets']"));assert(app.includes('SavedBooklets.init'));
console.log('Booklets: duplicate prevention, independent collections, annotation/backup retention, overlap ranges, changed-source protection, safe import and small deployment assets passed.');
