/* Large original documents stay outside the deployment package. */
(function(){
 'use strict';
 const ids={
  'resources/assessment.pdf':'libfile_ea20d8726b648191bdbe2c957bc2485a',
  'resources/spreadsheet-tutorials.pdf':'libfile_bd276e47daa8819197a8fb7402438529',
  'resources/week-1.pdf':'libfile_034484549bd0819188c77d5cd5396514',
  'resources/week-2.pdf':'libfile_c4663fe9ebb08191903a8ff759bcd0d8',
  'resources/week-3.pdf':'libfile_0380a663d87081918a2380288082a1d1',
  'resources/week-4.pdf':'libfile_d7ac9b5a224c8191be09122f9fd96a5c',
  'resources/week-5.pdf':'libfile_26e13f0e486c8191a2926d25e36c83a5',
  'resources/booklet-two.pdf':'libfile_3e6f5fd6b9c08191908dc6e140aac155',
  'resources/dashboard-resources.zip':'libfile_8fcb17ff2468819186686b5eb1d7ea13',
  'resources/teacher-dashboard/Best case in scenario manager.png':'libfile_91ed5499ce6081918dfb56bd8f729549',
  'resources/teacher-dashboard/AVG case in scenario manager.png':'libfile_daa80aeb83c08191a45e944fc7c2a0d7',
  'resources/teacher-dashboard/Worst case in scenario manager.png':'libfile_5ab5e7ea5d908191b2c10814dcb34afd',
  'resources/teacher-dashboard/Scenario SUmmary.png':'libfile_36b0dfd9e73c8191aa94291ef16e1984'
 };
 window.SOURCE_DOCUMENTS=Object.fromEntries(Object.entries(ids).map(([path,id])=>[path,'https://chatgpt.com/library?file_id='+id+'&account_id=personal']));
 if(typeof document==='undefined')return;
 function rewrite(root){
  const links=[...(root.matches?.('a[href]')?[root]:[]),...root.querySelectorAll('a[href]')];
  for(const a of links){
   let url;try{url=new URL(a.getAttribute('href'),document.baseURI);}catch{continue;}
   const base=new URL('./',document.baseURI);
   if(url.origin!==base.origin||!url.pathname.startsWith(base.pathname))continue;
   let path;try{path=decodeURIComponent(url.pathname.slice(base.pathname.length));}catch{continue;}
   const target=window.SOURCE_DOCUMENTS[path];if(!target)continue;
   a.href=target;a.target='_blank';a.rel='noopener';a.removeAttribute('download');
   const page=url.hash.match(/^#page=(\d+)$/)?.[1];
   a.title='Opens the original document in your ChatGPT account.'+(page?' See source page '+page+'.':'');
  }
 }
 rewrite(document);
 new MutationObserver(records=>{for(const r of records)for(const n of r.addedNodes)if(n.nodeType===1)rewrite(n);}).observe(document.body,{childList:true,subtree:true});
})();
