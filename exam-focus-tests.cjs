const assert=require('node:assert/strict');global.window=global;require('./study-week.js');
for(const f of ['content-notes','practice-content','learning-data','lab-curriculum','booklet-lab','booklet-data','sheet-engine','exam-focus'])require('./'+f+'.js');
const m=MOCKS.find(m=>m.id==='teacher-focus'),r=m.rows;
assert.equal(MOCKS.length,3);assert.equal(COURSE_NOTES.length,24);
assert.equal(new Set(MOCKS.map(m=>m.id)).size,MOCKS.length);
assert.equal(m.questions.filter(q=>q.section==='A').reduce((n,q)=>n+q.marks,0),24);
assert.equal(m.questions.filter(q=>q.section==='B').reduce((n,q)=>n+q.marks,0),16);
assert.deepEqual(r.filter(x=>x[1]==='North'&&x[2]==='Network').map(x=>x[0]),['T201','T206','T209']);
assert.equal(r.reduce((n,x)=>n+x[6],0),748);
assert.equal(r.filter(x=>x[4]>30).length,5);
const cells={};m.headers.forEach((v,i)=>cells[SheetEngine.letters(i)+'1']=v);
r.forEach((row,i)=>row.forEach((v,j)=>cells[SheetEngine.letters(j)+(i+2)]=v));
cells.J2=25;const e=new SheetEngine(cells);
const checks=[
 ['K2','=AVERAGEIF(B2:B13,"North",E2:E13)',28.2],
 ['K3','=AVERAGEIF(B2:B13,"South",E2:E13)',37.75],
 ['K4','=SUM(G2:G13)',748],
 ['K5','=VLOOKUP("T208",A2:G13,5,FALSE)',60],
 ['K6','=COUNTIF(E2:E13,">30")',5],
 ['H2','=IF(E2<=F2,"Met","Over target")','Met'],
 ['H7','=IF(E7<=F7,"Met","Over target")','Met'],
 ['I4','=IF(E4<=$J$2,"Met","Over target")','Met']
];for(const [cell,f,v]of checks){e.set(cell,f);assert.equal(e.get(cell),v,f);}
e.set('J2',24);assert.equal(e.get('I4'),'Over target');
e.set('I2','=IF(E2<=$J$2,"Met","Over target")');e.fill('I2','I13');assert.equal(e.raw('I13'),'=IF(E13<=$J$2,"Met","Over target")');
assert.equal(60/200*100,30);assert.equal(64/320*100,20);
assert(Math.abs((37.75-28.2)-9.55)<1e-9);
assert(EXAM_PRIORITIES.every(p=>p.length===5));
const fs=require('node:fs'),csv=fs.readFileSync('./resources/teacher-focus-dataset.csv','utf8');
assert.equal(csv.split('\r\n').length,13);
assert(csv.startsWith('"TicketID","Region"'));
console.log('Teacher-guided mock: section marks, dataset, filter results, formulas, target changes and comparison figures passed.');
