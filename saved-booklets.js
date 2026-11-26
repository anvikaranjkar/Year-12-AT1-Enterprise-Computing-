/* Personal revision booklets. Text is stored as text, never restored as executable HTML. */
(function(){
 'use strict';
 const colours=['yellow','mint','blue','pink'];
 const uid=()=>globalThis.crypto?.randomUUID?.()||Date.now().toString(36)+'-'+Math.random().toString(36).slice(2);
 const clip=(value,n=200000)=>String(value??'').slice(0,n);
 function normalise(value){
  const v=value&&typeof value==='object'?value:{};
  const books=Array.isArray(v.books)?v.books.filter(b=>b&&typeof b.id==='string'&&typeof b.title==='string').map(b=>({id:b.id,title:clip(b.title,100)})):[];
  if(!books.length)books.push({id:'my-revision',title:'My revision booklet'});
  const ids=new Set(books.map(b=>b.id));
  const items=Array.isArray(v.items)?v.items.filter(x=>x&&typeof x.id==='string'&&typeof x.text==='string').map(x=>({...x,bookId:ids.has(x.bookId)?x.bookId:books[0].id,kind:['highlight','note','custom'].includes(x.kind)?x.kind:'custom',colour:colours.includes(x.colour)?x.colour:'yellow',title:clip(x.title,200),text:clip(x.text),annotation:clip(x.annotation,20000),sourceKey:clip(x.sourceKey,300),sourceHash:/^#(?:notes|revision|glossary)(?:\/[a-z0-9_-]+)*$/i.test(x.sourceHash||'')?x.sourceHash:'',createdAt:Number.isFinite(Date.parse(x.createdAt))?x.createdAt:new Date().toISOString(),start:Number.isInteger(x.start)?x.start:-1,end:Number.isInteger(x.end)?x.end:-1})):[];
  return {books,items,active:ids.has(v.active)?v.active:books[0].id,colour:colours.includes(v.colour)?v.colour:'yellow'};
 }
 function add(data,item){
  const duplicate=data.items.find(x=>x.bookId===item.bookId&&x.kind===item.kind&&x.sourceKey===item.sourceKey&&x.text===item.text&&(item.kind!=='highlight'||x.start===item.start));
  if(duplicate)return {item:duplicate,created:false};
  const saved={id:uid(),createdAt:new Date().toISOString(),annotation:'',colour:data.colour,...item};data.items.push(saved);return {item:saved,created:true};
 }
 function anchors(text,items){
  return items.filter(x=>x.kind==='highlight'&&Number.isInteger(x.start)&&x.start>=0&&x.end>x.start&&text.slice(x.start,x.end)===x.text).sort((a,b)=>a.start-b.start||a.createdAt.localeCompare(b.createdAt));
 }
 function segments(text,items){
  const valid=anchors(text,items),points=[...new Set([0,text.length,...valid.flatMap(x=>[x.start,x.end])])].sort((a,b)=>a-b);
  return points.slice(0,-1).map((start,i)=>({start,end:points[i+1],items:valid.filter(x=>x.start<=start&&x.end>=points[i+1])})).filter(x=>x.items.length);
 }
 const API=window.SavedBooklets={colours,normalise,add,anchors,segments};
 if(typeof document==='undefined')return;
 let context,root,observer,pending=null,toolbar,selectionButton,selectionLabel,selectionNote,destination;
 const E=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const data=()=>context.state.savedBooklets=normalise(context.state.savedBooklets);
 const changed=()=>{const ok=context.save();if(ok===false)context.toast('This change is in memory only. Export a progress backup before closing.');return ok;};
 function textNodes(zone){const w=document.createTreeWalker(zone,NodeFilter.SHOW_TEXT);const nodes=[];while(w.nextNode())nodes.push(w.currentNode);return nodes;}
 function clearMarks(zone){zone.querySelectorAll('mark[data-saved-highlight]').forEach(m=>m.replaceWith(...m.childNodes));zone.normalize();}
 function paint(zone){
  clearMarks(zone);const entries=data().items.filter(x=>x.sourceKey===zone.dataset.readingKey),parts=segments(zone.textContent,entries);
  if(!parts.length)return;
  let offset=0;
  for(const node of textNodes(zone)){
   const start=offset,end=offset+node.length;offset=end;
   const relevant=parts.filter(p=>p.start<end&&p.end>start);if(!relevant.length)continue;
   const frag=document.createDocumentFragment();let local=0;
   for(const part of relevant){const lo=Math.max(start,part.start)-start,hi=Math.min(end,part.end)-start;if(lo>local)frag.append(document.createTextNode(node.data.slice(local,lo)));
    const mark=document.createElement('mark');mark.dataset.savedHighlight=part.items[0].id;mark.className='saved-highlight hl-'+part.items[0].colour;mark.textContent=node.data.slice(lo,hi);mark.title='Saved in Booklets'+(part.items.length>1?' ('+part.items.length+' overlapping highlights)':'');frag.append(mark);local=hi;
   }
   if(local<node.length)frag.append(document.createTextNode(node.data.slice(local)));node.replaceWith(frag);
  }
 }
 function destinations(){
  const d=data();destination.innerHTML=d.books.map(b=>'<option value="'+E(b.id)+'" '+(d.active===b.id?'selected':'')+'>'+E(b.title)+'</option>').join('');
 }
 function resetSelection(){pending=null;if(selectionButton)selectionButton.disabled=true;if(selectionLabel)selectionLabel.textContent='Select text in a note, cheat-sheet section or graph guide.';}
 function captureSelection(){
  const s=window.getSelection();if(!s||s.isCollapsed||!s.rangeCount)return resetSelection();
  const r=s.getRangeAt(0);const element=n=>n.nodeType===1?n:n.parentElement;const zone=element(r.startContainer)?.closest('[data-reading-key]');
  if(!zone||!root.contains(zone)||!zone.contains(r.endContainer)||element(r.startContainer)?.closest('input,textarea,select,button'))return resetSelection();
  const before=document.createRange();before.selectNodeContents(zone);try{before.setEnd(r.startContainer,r.startOffset);}catch{return resetSelection();}
  const raw=r.toString(),left=raw.length-raw.trimStart().length,right=raw.length-raw.trimEnd().length;
  const text=raw.trim();if(!text)return resetSelection();
  const start=before.toString().length+left,end=start+raw.length-left-right;
  pending={zone,sourceKey:zone.dataset.readingKey,sourceHash:zone.dataset.sourceHash,title:zone.dataset.readingTitle,text,start,end};
  selectionButton.disabled=false;selectionLabel.textContent=text.length+' characters selected. Choose a colour, then save.';
 }
 function saveSelection(){
  if(!pending){context.toast('Select some text in the study notes first.');return;}
  const d=data(),p=pending,bookId=destination.value;
  if(p.zone.textContent.slice(p.start,p.end)!==p.text){resetSelection();context.toast('The note changed. Select that passage again.');return;}
  const result=add(d,{kind:'highlight',bookId,title:p.title,text:p.text,sourceKey:p.sourceKey,sourceHash:p.sourceHash,start:p.start,end:p.end,colour:d.colour,annotation:selectionNote.value.trim()});
  // data() normalises into a new object; persist the same instance that was edited.
  context.state.savedBooklets=d;const persisted=changed();paint(p.zone);selectionNote.value='';window.getSelection()?.removeAllRanges();resetSelection();
  if(persisted!==false)context.toast(result.created?'Highlight saved in '+d.books.find(b=>b.id===bookId).title+'.':'This highlight is already in that booklet.');
 }
 function createBook(title){
  title=clip(title.trim(),100);if(!title)return null;const d=data(),book={id:uid(),title};d.books.push(book);d.active=book.id;context.state.savedBooklets=d;changed();return book;
 }
 function setUpToolbar(){
  if(toolbar?.isConnected)return;
  toolbar=document.createElement('section');toolbar.className='reading-toolbar card';toolbar.setAttribute('aria-label','Highlight and save notes');
  toolbar.innerHTML='<div class="reading-toolbar-top"><div><span class="tag">MAKE THESE NOTES YOURS</span><h2>Highlight & save</h2></div><a href="#booklets" class="btn secondary small">Open Booklets →</a></div><div class="reading-controls"><label class="field">Save to booklet<select id="highlight-booklet"></select></label><fieldset class="highlight-palette"><legend>Highlight colour</legend>'+colours.map(c=>'<button type="button" class="colour-choice hl-'+c+'" data-hl-colour="'+c+'" aria-label="'+c+' highlight" aria-pressed="false"><span aria-hidden="true">✓</span></button>').join('')+'</fieldset><button type="button" class="btn" id="save-highlight" disabled>Save highlight</button><button type="button" class="quiet-btn" id="quick-new-booklet">New booklet</button></div><label class="field reading-annotation">Your annotation (optional)<input id="highlight-annotation" maxlength="20000" placeholder="Why does this matter? What should I remember?"></label><p id="highlight-status" class="notice" aria-live="polite">Select text in a note, cheat-sheet section or graph guide.</p>';
  const first=root.querySelector('[data-reading-key]');const anchor=first.closest('.note-body')||root.querySelector('.revision-tabs')?.nextElementSibling||first;
  anchor.before(toolbar);
  destination=toolbar.querySelector('#highlight-booklet');selectionButton=toolbar.querySelector('#save-highlight');selectionLabel=toolbar.querySelector('#highlight-status');selectionNote=toolbar.querySelector('#highlight-annotation');destinations();
  destination.onchange=()=>{const d=data();d.active=destination.value;context.state.savedBooklets=d;changed();};
  const syncPalette=()=>{const d=data();toolbar.querySelectorAll('[data-hl-colour]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.hlColour===d.colour)));};
  toolbar.querySelectorAll('[data-hl-colour]').forEach(b=>b.onclick=()=>{const d=data();d.colour=b.dataset.hlColour;context.state.savedBooklets=d;changed();syncPalette();});syncPalette();
  selectionButton.onclick=saveSelection;
  toolbar.querySelector('#quick-new-booklet').onclick=()=>{const title=prompt('Name your new revision booklet:');if(title!==null&&createBook(title)){destinations();context.toast('Booklet created.');}};
 }
 function readingZones(){
  const page=location.hash.split('/')[0];
  if(page==='#notes')return [...root.querySelectorAll('.reading-content')].map(zone=>({zone,key:'notes:'+zone.dataset.noteId,title:zone.dataset.noteTitle,hash:'#notes/'+zone.dataset.noteId}));
  if(location.hash==='#revision/cheatsheet')return [...root.querySelectorAll('.cheat-section')].map(zone=>({zone,key:'cheatsheet:'+zone.id,title:zone.querySelector('h2').textContent,hash:'#revision/cheatsheet'}));
  if(location.hash==='#revision/graphs')return [...root.querySelectorAll('.coach-graph-card')].map((zone,i)=>({zone,key:'graph:'+window.EXAM_COACH_DATA.graphs[i].id,title:zone.querySelector('h2').textContent,hash:'#revision/graphs'}));
  return [];
 }
 function mount(){
  if(!context||location.hash.startsWith('#booklets'))return;
  const zones=readingZones();if(!zones.length){toolbar?.remove();toolbar=null;return;}
  for(const s of zones){if(s.zone.dataset.readingKey)continue;s.zone.dataset.readingKey=s.key;s.zone.dataset.readingTitle=s.title;s.zone.dataset.sourceHash=s.hash;
   const wrap=document.createElement('div');wrap.className='reading-zone';s.zone.before(wrap);wrap.append(s.zone);
   const button=document.createElement('button');button.type='button';button.className='btn secondary small save-whole-note';button.textContent='Save whole note to booklet';wrap.prepend(button);
   button.onclick=()=>{const d=data(),bookId=destination?.value||d.active;const result=add(d,{kind:'note',bookId,title:s.title,text:s.zone.innerText||s.zone.textContent,sourceKey:s.key,sourceHash:s.hash,start:-1,end:-1});context.state.savedBooklets=d;if(changed()!==false)context.toast(result.created?'Whole note saved to Booklets.':'This note is already in that booklet.');};
   paint(s.zone);
  }
  setUpToolbar();
 }
 API.init=function(main,ctx){root=main;context=ctx;data();observer=new MutationObserver(()=>mount());observer.observe(root,{childList:true,subtree:true});document.addEventListener('selectionchange',()=>{const s=window.getSelection();const active=document.activeElement;if(toolbar?.contains(active)&&(!s||s.isCollapsed||!root.contains(s.anchorNode)))return;captureSelection();});document.addEventListener('pointerup',e=>{if(!toolbar?.contains(e.target))captureSelection();});document.addEventListener('keyup',e=>{if(e.key==='Escape')resetSelection();else if(!toolbar?.contains(e.target))captureSelection();});mount();};
 API.setContext=function(ctx){context=ctx;};
 API.render=function(main,ctx){
  context=ctx;resetSelection();const d=data(),book=d.books.find(b=>b.id===d.active),$=s=>main.querySelector(s),$$=s=>[...main.querySelectorAll(s)];
  const entries=d.items.filter(x=>x.bookId===book.id).slice().reverse();
  main.innerHTML='<div class="page-head"><div class="eyebrow">YOUR PERSONAL REVISION COLLECTION</div><h1>Booklets</h1><p class="intro">Keep highlighted passages, complete notes and your own explanations together. Select text in Learn & revise, the cheat sheet or a graph guide to start.</p></div><div class="booklets-layout"><aside class="card booklet-library"><div class="flex-between"><h2>Your booklets</h2><span class="tag">'+d.books.length+'</span></div><nav aria-label="Saved booklets">'+d.books.map(b=>'<button class="booklet-tab '+(b.id===book.id?'selected':'')+'" data-select-book="'+E(b.id)+'" '+(b.id===book.id?'aria-current="page"':'')+'><span>'+E(b.title)+'</span><small>'+d.items.filter(x=>x.bookId===b.id).length+'</small></button>').join('')+'</nav><form id="new-booklet-form"><label class="field">New booklet name<input id="new-booklet-title" maxlength="100" placeholder="e.g. Formulas I keep forgetting" required></label><button class="btn secondary small" type="submit">Create booklet</button></form><p class="notice">Saved on this browser. Use Resources → Export progress backup to keep a copy or move devices.</p></aside><div class="booklet-main"><section class="card"><div class="flex-between"><div><span class="tag">'+entries.length+' SAVED ITEMS</span><h2>'+E(book.title)+'</h2></div><div class="row"><button class="quiet-btn" id="rename-booklet">Rename</button><button class="quiet-btn" id="delete-booklet">Delete booklet</button></div></div><div class="booklet-filters"><label class="field">Search this booklet<input type="search" id="booklet-search" placeholder="Search notes, highlights and annotations"></label><label class="field">Show<select id="booklet-kind"><option value="all">Everything</option><option value="highlight">Highlights</option><option value="note">Whole notes</option><option value="custom">My own notes</option></select></label><label class="field">Colour<select id="booklet-colour"><option value="all">All colours</option>'+colours.map(c=>'<option value="'+c+'">'+c+'</option>').join('')+'</select></label></div><div class="row"><button class="btn secondary small" id="export-booklet">Export booklet .txt</button><button class="btn secondary small" id="print-booklet">Print / PDF</button><a class="btn small" href="#notes/excel-basics">Go highlight notes →</a></div></section><details class="card booklet-compose"><summary>Add my own note</summary><form id="own-note-form"><label class="field">Title<input id="own-note-title" maxlength="200" required></label><label class="field">Explanation or worked example<textarea id="own-note-text" rows="5" maxlength="200000" required></textarea></label><button type="submit" class="btn">Save my note</button></form></details><p id="booklet-count" class="notice" aria-live="polite"></p><div id="booklet-items" class="stack">'+entries.map(item=>'<article class="card saved-item" data-saved-item="'+E(item.id)+'"><div class="flex-between"><span class="tag">'+({highlight:'HIGHLIGHT',note:'WHOLE NOTE',custom:'MY NOTE'}[item.kind])+'</span><small>'+E(new Date(item.createdAt).toLocaleDateString('en-AU'))+'</small></div><h3>'+E(item.title)+'</h3><div class="saved-passage '+(item.kind==='highlight'?'hl-'+item.colour:'')+'">'+E(item.text)+'</div><label class="field annotation-label">My annotation<textarea data-annotation="'+E(item.id)+'" rows="3" maxlength="20000" placeholder="Explain this in your own words…">'+E(item.annotation)+'</textarea><div class="annotation-print">'+E(item.annotation)+'</div></label><div class="saved-item-actions">'+(item.sourceHash?'<a href="'+E(item.sourceHash)+'" class="link-arrow" data-open-source="'+E(item.id)+'">Return to source →</a>':'')+'<label class="field">Move to<select data-move-item="'+E(item.id)+'">'+d.books.map(b=>'<option value="'+E(b.id)+'" '+(b.id===item.bookId?'selected':'')+'>'+E(b.title)+'</option>').join('')+'</select></label>'+(item.kind==='highlight'?'<label class="field">Colour<select data-colour-item="'+E(item.id)+'">'+colours.map(c=>'<option value="'+c+'" '+(c===item.colour?'selected':'')+'>'+c+'</option>').join('')+'</select></label>':'')+'<button type="button" class="quiet-btn" data-delete-item="'+E(item.id)+'">Remove</button></div></article>').join('')+'</div><div id="booklet-empty" class="card" '+(entries.length?'hidden':'')+'><h3>A booklet built around what you need.</h3><p>Open a lesson, select a passage, choose a colour and press Save highlight. Or use Save whole note to keep the entire lesson here.</p><a class="btn secondary" href="#notes/excel-basics">Open your notes →</a></div></div></div>';
  function rerender(){API.render(main,ctx);}
  function update(fn){const value=data();fn(value);context.state.savedBooklets=value;return changed();}
  $$('[data-select-book]').forEach(b=>b.onclick=()=>{update(v=>v.active=b.dataset.selectBook);rerender();});
  $('#new-booklet-form').onsubmit=e=>{e.preventDefault();if(createBook($('#new-booklet-title').value))rerender();};
  $('#rename-booklet').onclick=()=>{const title=prompt('Rename booklet:',book.title);if(title?.trim()){update(v=>v.books.find(b=>b.id===book.id).title=clip(title.trim(),100));rerender();}};
  $('#delete-booklet').onclick=()=>{if(!confirm('Delete “'+book.title+'” and its '+entries.length+' saved items? Export it first if you want to keep a copy.'))return;update(v=>{v.books=v.books.filter(b=>b.id!==book.id);v.items=v.items.filter(x=>x.bookId!==book.id);if(!v.books.length)v.books=[{id:'my-revision',title:'My revision booklet'}];v.active=v.books[0].id;});rerender();};
  $('#own-note-form').onsubmit=e=>{e.preventDefault();const title=$('#own-note-title').value.trim(),text=$('#own-note-text').value.trim();if(!title||!text)return;const persisted=update(v=>add(v,{kind:'custom',bookId:book.id,title,text,sourceKey:'',sourceHash:'',start:-1,end:-1}));rerender();if(persisted!==false)ctx.toast('Your note is saved.');};
  $$('[data-annotation]').forEach(t=>t.oninput=()=>{update(v=>v.items.find(x=>x.id===t.dataset.annotation).annotation=t.value);t.closest('.saved-item').querySelector('.annotation-print').textContent=t.value;});
  $$('[data-move-item]').forEach(s=>s.onchange=()=>{update(v=>v.items.find(x=>x.id===s.dataset.moveItem).bookId=s.value);rerender();});
  $$('[data-colour-item]').forEach(s=>s.onchange=()=>{update(v=>v.items.find(x=>x.id===s.dataset.colourItem).colour=s.value);rerender();});
  $$('[data-delete-item]').forEach(b=>b.onclick=()=>{if(confirm('Remove this saved item and its annotation?')){update(v=>v.items=v.items.filter(x=>x.id!==b.dataset.deleteItem));rerender();}});
  $$('[data-open-source]').forEach(a=>a.onclick=()=>{try{sessionStorage.setItem('enterprise-open-highlight',a.dataset.openSource);}catch{}});
  function filter(){const q=$('#booklet-search').value.trim().toLowerCase(),kind=$('#booklet-kind').value,colour=$('#booklet-colour').value;let shown=0;$$('[data-saved-item]').forEach(el=>{const item=data().items.find(x=>x.id===el.dataset.savedItem);const visible=(!q||(item.title+' '+item.text+' '+item.annotation).toLowerCase().includes(q))&&(kind==='all'||item.kind===kind)&&(colour==='all'||item.kind==='highlight'&&item.colour===colour);el.hidden=!visible;if(visible)shown++;});$('#booklet-count').textContent=shown+' of '+entries.length+' saved items shown.';$('#booklet-empty').hidden=entries.length>0;if(entries.length&&shown===0)$('#booklet-count').textContent+=' Try another search or filter.';}
  for(const id of ['booklet-search','booklet-kind','booklet-colour'])$('#'+id).addEventListener(id==='booklet-search'?'input':'change',filter);filter();
  $('#export-booklet').onclick=()=>{const value=data(),items=value.items.filter(x=>x.bookId===book.id);ctx.download('Enterprise-'+book.title.replace(/[^a-z0-9]+/ig,'-').slice(0,80)+'.txt',book.title+'\nExported '+new Date().toLocaleDateString('en-AU')+'\n\n'+items.map(x=>x.title+' ['+x.kind+']\n'+x.text+(x.annotation?'\n\nMY ANNOTATION\n'+x.annotation:'')+(x.sourceHash?'\nSource: '+x.sourceHash:'')).join('\n\n'+'─'.repeat(40)+'\n\n'));};
  $('#print-booklet').onclick=()=>window.print();
 };
 API.focusSaved=function(){let id;try{id=sessionStorage.getItem('enterprise-open-highlight');}catch{return;}if(!id)return;const mark=root.querySelector('mark[data-saved-highlight="'+CSS.escape(id)+'"]');if(mark){mark.scrollIntoView({block:'center',behavior:'smooth'});mark.classList.add('highlight-focus');setTimeout(()=>mark.classList.remove('highlight-focus'),2500);try{sessionStorage.removeItem('enterprise-open-highlight');}catch{}}};
 const oldMount=mount;mount=function(){oldMount();API.focusSaved();};
})();
