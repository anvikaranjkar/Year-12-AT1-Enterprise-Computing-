const assert=require('node:assert/strict'),fs=require('node:fs');
global.window=global;require('./study-week.js');
for(const f of ['resource-links','content-notes','practice-content','sheet-engine','learning-data','lab-curriculum','statistics-practice','booklet-lab','booklet-data','exam-focus','cheat-sheet-data','exam-coach-data','justification-mock'])require('./'+f+'.js');
const D=EXAM_COACH_DATA,m=MOCKS.find(x=>x.id==='justify-retail');
assert.equal(MOCKS.length,4);assert.equal(CHEAT_SHEET_SECTIONS.length,17);
assert.equal(new Set(COURSE_NOTES.map(x=>x.id)).size,COURSE_NOTES.length);
for(const section of ['A','B'])assert.equal(m.questions.filter(q=>q.section===section).reduce((a,q)=>a+q.marks,0),section==='A'?24:16);
assert.equal(m.rows.length,16);assert.equal(m.rows.reduce((a,r)=>a+r[3]*r[4],0),459);
assert.deepEqual(m.rows.filter(r=>r[1]==='North'&&r[2]==='Online').map(r=>r[0]),['R301','R307','R313','R316']);
const mean=a=>a.reduce((x,y)=>x+y,0)/a.length;
assert.equal(mean(m.rows.filter(r=>r[1]==='North').map(r=>r[5])),23);
assert.equal(mean(m.rows.filter(r=>r[1]==='South').map(r=>r[5])),31.6);
for(let i=0;i<m.chart.labels.length;i++){const region=m.chart.labels[i];assert.equal(m.chart.values[i],m.rows.filter(r=>r[1]===region).reduce((a,r)=>a+r[3]*r[4],0));}
const cells={K2:30};m.headers.forEach((h,i)=>cells[SheetEngine.letters(i)+'1']=h);m.rows.forEach((r,i)=>r.forEach((v,j)=>cells[SheetEngine.letters(j)+(i+2)]=v));
const e=new SheetEngine(cells);e.set('H2','=D2*E2');for(let r=3;r<=17;r++)e.fill('H2','H'+r);
for(const [ref,formula,result]of [['K4','=SUM(H2:H17)',459],['K5','=AVERAGEIF(B2:B17,"North",F2:F17)',23],['K6','=AVERAGEIF(B2:B17,"South",F2:F17)',31.6],['K7','=VLOOKUP("R305",$A$2:$I$17,6,FALSE)',45],['I2','=IF(F2<=G2,"Met","Over")','Met']]){e.set(ref,formula);assert.equal(e.get(ref),result,formula);}
for(let r=3;r<=17;r++)e.fill('I2','I'+r);assert.equal(e.get('I11'),'Met');
e.set('J2','=IF(F2<=$K$2,"Met","Over")');for(let r=3;r<=17;r++)e.fill('J2','J'+r);assert.equal(e.get('J15'),'Met');e.set('K2',29);assert.equal(e.get('J15'),'Over');e.set('K2',30);
assert.equal(100/400,0.25);assert.equal(75/250,0.30);
assert.equal(D.modules.length,16);assert.deepEqual(D.modules.map(x=>x.lesson),Array.from({length:16},(_,i)=>i+1));
for(const x of D.modules)assert(LAB_PACKS.some(p=>p.id===x.lab));
for(const x of D.teacherSets){assert(COURSE_NOTES.some(n=>n.id===x.note));assert(SOURCE_DOCUMENTS['resources/week-'+x.week+'.pdf']);if(x.lab)assert(LAB_PACKS.some(p=>p.id===x.lab));assert(x.criteria.length>=3);}
assert.deepEqual([...new Set(D.teacherSets.map(x=>x.week))].sort(),[1,2,3,4,5]);
const hist=D.graphs.find(x=>x.id==='histogram'),times=EXAM_PRACTICE_ROWS.map(r=>r[4]);assert.deepEqual(hist.values,[0,20,40,60].map(lo=>times.filter(v=>v>=lo&&v<lo+20).length));
assert.equal(D.graphs.find(g=>g.id==='pie').values.reduce((a,b)=>a+b,0),100);
for(const q of D.graphCases){assert(q.allowed.includes(q.preferred));for(const id of q.allowed)assert(D.graphs.some(g=>g.id===id));}
for(const name of ['Book1.xlsx','Summary.xltx','Best case in scenario manager.png','AVG case in scenario manager.png','Worst case in scenario manager.png','Scenario SUmmary.png'])assert(fs.existsSync('resources/teacher-dashboard/'+name)||SOURCE_DOCUMENTS['resources/teacher-dashboard/'+name]);
const html=fs.readFileSync('index.html','utf8');for(const path of [...html.matchAll(/(?:src|href)="([^"#?]+)(?:\?[^"]*)?"/g)].map(m=>m[1]))if(!path.startsWith('http'))assert(fs.existsSync(path),path);
assert(fs.readFileSync('app.js','utf8').includes("KEY='enterprise-studio-v1'"));
console.log('Exam preparation: mock formulas/marks, dataset/chart consistency, boundary changes, histogram bins, source assets and all 16 lesson links passed.');

