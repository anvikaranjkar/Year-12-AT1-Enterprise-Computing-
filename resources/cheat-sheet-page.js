
const input=document.getElementById('search'),status=document.getElementById('status');
function reset(){input.value='';applySearch();input.focus()}
function applySearch(){
 const q=input.value.trim().toLowerCase();let shown=0;
 for(const section of document.querySelectorAll('main section')){
  const heading=section.querySelector('h2').textContent.toLowerCase();
  const wholeMatch=q&&heading.includes(q);let matches=0;
  for(const tr of section.querySelectorAll('tbody tr')){
   const show=!q||wholeMatch||tr.textContent.toLowerCase().includes(q);
   tr.hidden=!show;if(show){matches++;shown++}
  }
  const prose=[...section.querySelectorAll(':scope > p')].some(p=>p.textContent.toLowerCase().includes(q));
  section.hidden=!!q&&!wholeMatch&&!matches&&!prose;
 }
 status.textContent=q?shown+' matching table rows':'Complete reference';
}
input.addEventListener('input',applySearch);
document.getElementById('clear').addEventListener('click',reset);
document.getElementById('print').addEventListener('click',()=>window.print());
window.addEventListener('beforeprint',()=>{document.querySelectorAll('[hidden]').forEach(el=>{el.dataset.wasHidden='1';el.hidden=false})});
window.addEventListener('afterprint',()=>{document.querySelectorAll('[data-was-hidden]').forEach(el=>{el.hidden=true;delete el.dataset.wasHidden})});
applySearch();
