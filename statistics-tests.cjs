const assert=require('node:assert/strict');global.window=global;require('./study-week.js');
for(const f of ['sheet-engine','learning-data','lab-curriculum','statistics-practice','lab-tools'])require('./'+f+'.js');
const e=new SheetEngine({A1:'Score',A2:2,A3:4,A4:4,A5:4,A6:5,A7:5,A8:7,A9:9,B1:'Label',B2:'',B3:0,B4:'Text',B5:'=""',J1:'Quiz1',K1:'Quiz2',L1:'Project',J2:100,K2:100,L2:50});
let n=0;const test=(f,x)=>{e.set('Z1',f);const a=e.get('Z1');if(typeof x==='number')assert(Math.abs(a-x)<1e-10,f+': '+a);else assert.equal(a,x,f);n++;};
test('=MODE(A2:A9)',4);test('=MODE.SNGL(A2:A9)',4);
test('=MODE.SNGL(2,2,1,1)',1);test('=MODE.SNGL(0,0,1)',0);test('=MODE.SNGL(1,2,3)','#N/A');test('=MODE.SNGL(B2:B2)','#N/A');
test('=STDEV.S(A2:A9)',Math.sqrt(32/7));test('=STDEV(A2:A9)',Math.sqrt(32/7));test('=STDEV.P(A2:A9)',2);
test('=STDEV.S(1)','#DIV/0!');test('=STDEV.S(1,3)',Math.sqrt(2));test('=STDEV.P(7)',0);test('=STDEV.P(B2:B2)','#DIV/0!');
e.set('C2','=1/0');test('=STDEV.S(A2:A9,C2)','#DIV/0!');
test('=HLOOKUP("Project",J1:L2,2,FALSE)',50);test('=HLOOKUP("quiz2",J1:L2,2,FALSE)',100);
test('=HLOOKUP("Missing",J1:L2,2,FALSE)','#N/A');test('=HLOOKUP("Quiz1",J1:L2,3,FALSE)','#REF!');test('=HLOOKUP("Quiz1",J1:L2,0,FALSE)','#VALUE!');
e.set('J4',10);e.set('K4',20);e.set('L4',30);e.set('J5','Low');e.set('K5','Mid');e.set('L5','High');
test('=HLOOKUP(25,J4:L5,2,TRUE)','Mid');test('=HLOOKUP(5,J4:L5,2,TRUE)','#N/A');
test('=SUBTOTAL(103,B2:B5)',3);test('=SUBTOTAL(102,B2:B5)',1);e.hiddenRows.add(3);test('=SUBTOTAL(103,B2:B5)',2);test('=SUBTOTAL(102,B2:B5)',0);e.hiddenRows.clear();
const p=LAB_PACKS.find(p=>p.id==='statistics'),book=LabTools.createBook(p),se=new SheetEngine(book.sheets[book.activeSheet],{sheets:book.sheets,activeSheet:book.activeSheet});
for(const l of p.lessons){se.set(l.cell,l.solution);assert(LabTools.equal(se.get(l.cell),l.value),l.id);assert(LabTools.checkFormula(se,l).ok,l.id+' formula check');}
se.hiddenRows=new Set([7,8,9,10,11]);assert.equal(se.get('H23'),5);
console.log(n+' added statistical/lookup/visible-count checks and '+p.lessons.length+' new workbook checkpoints passed.');

