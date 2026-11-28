const assert=require('node:assert/strict');
global.window=global;require('./study-week.js');
for(const f of ['content-notes','practice-content','learning-data','lab-curriculum','booklet-lab','booklet-data','booklet-view'])require('./'+f+'.js');
const B=BookletMath;
assert.equal(COURSE_NOTES.length,23);
assert.equal(QUIZ_BANK.length,72);
assert.equal(FLASHCARDS.length,56);
assert.equal(BOOKLET_UNITS.length,23);
assert.equal(BOOKLET_WRITING.length,23);
assert.equal(new Set(QUIZ_BANK.map(q=>q.id)).size,QUIZ_BANK.length);
assert.equal(new Set(COURSE_NOTES.map(q=>q.id)).size,COURSE_NOTES.length);
assert.equal(new Set(BOOKLET_WRITING.map(q=>q.id)).size,BOOKLET_WRITING.length);
assert.equal(new Set(GLOSSARY.map(g=>g[0].toLowerCase())).size,GLOSSARY.length);
for(const q of QUIZ_BANK){assert(q.correct>=0&&q.correct<q.options.length,q.id);assert(q.explanation.length>20,q.id);}
for(const [unit,title,page,note]of BOOKLET_UNITS){assert(COURSE_NOTES.some(n=>n.id===note),unit);assert(page>=1&&page<=47,title);assert(BOOKLET_WRITING.some(q=>q.unit===unit),unit+' needs written practice');}
for(const q of BOOKLET_WRITING){assert.equal(q.marks,q.criteria.length,q.id);assert(q.model.length>100,q.id);}
assert.equal(B.mean(BOOKLET_DATA.waits),20.5);
assert.equal(B.median(BOOKLET_DATA.waits),13);
assert.equal(B.median(BOOKLET_DATA.waits.filter((_,i)=>i!==6)),13);
assert(Math.abs(B.mean(BOOKLET_DATA.waits.filter((_,i)=>i!==6))-89/7)<1e-12);
assert.deepEqual(B.absoluteErrors(BOOKLET_DATA.predictions,BOOKLET_DATA.actual),[10,5,110,5]);
assert.equal(B.mean(B.absoluteErrors(BOOKLET_DATA.predictions,BOOKLET_DATA.actual)),32.5);
assert.equal(B.mean(BOOKLET_DATA.predictions.map((v,i)=>v-BOOKLET_DATA.actual[i])),27.5);
assert.equal(5*28-70,70);
const rows=BOOKLET_DATA.sales;assert.equal(rows.length,18);
for(const measure of ['units','revenue','records']){
 const expected=rows.reduce((s,r)=>s+(measure==='records'?1:r[measure]),0);
 for(const group of ['month','quarter','region','product']){
  for(const col of ['',...['month','quarter','region','product'].filter(k=>k!==group)]){
   const p=B.summarise(rows,group,col,measure);assert.equal(p.total,expected,group+'/'+col+'/'+measure);
   assert.equal(p.matrix.flat().reduce((a,b)=>a+b,0),expected);
  }
 }
}
const northFebSalad=rows.filter(r=>r.region==='North'&&r.month==='Feb'&&r.product==='Salad');
assert.equal(northFebSalad.length,1);
assert.equal(B.summarise(northFebSalad,'region','product','units').total,65);
assert.equal(B.summarise(northFebSalad,'region','product','revenue').total,455);
assert.equal(B.summarise([],'region','','units').total,0);
console.log('Booklet coverage, stable IDs, 72 quiz keys, written rubrics, outlier/forecast mathematics and OLAP aggregation checks passed.');
