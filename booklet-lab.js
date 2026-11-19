/* Small workbook based on the supplied Booklet 2 prediction examples. */
(function(){
 'use strict';
 const f=(id,title,topic,task,cell,value,solution,required,hint,why,extra={})=>({id,title,topic,skill:topic,kind:'formula',formula:true,task,cell,value,solution,required,hint,why,...extra});
 LAB_PACKS.push({
  id:'forecast',title:'Booklet 2 · Forecast review',activeSheet:'Forecasts',
  description:'Practise the booklet’s four forecast/actual pairs, then test its simplified cold-drinks rule. One main-sheet record is one evaluated week. Error is forecast minus actual; absolute error is its magnitude. D/E contain supplied live helper formulas. J2 is a 20-unit review threshold. Cold drinks is a teaching example, not a trained or validated demand model.',
  headers:['Week','Forecast','Actual','Error','AbsoluteError','Context','Notes','','','ReviewLimit','Answers','Helper'],
  rows:[[1,500,510,'=B2-C2','=ABS(D2)','Check source'],[2,520,515,'=B3-C3','=ABS(D3)','Check source'],[3,540,430,'=B4-C4','=ABS(D4)','Investigate unusual week'],[4,510,505,'=B5-C5','=ABS(D5)','Check source']],
  cells:{J2:20},
  sheets:{'Cold drinks':{headers:['Temperature','Drinks','Notes','FutureTemp','Slope','Intercept'],rows:[[20,30,'Observed',28,5,-70],[22,40,'Observed'],[24,50,'Observed'],[26,60,'Observed']]}},
  lessons:[
   f('p01','Keep the error sign','Arithmetic','On Forecasts, in K22 calculate forecast minus actual for week 1 using B2 and C2.','K22',-10,'=B2-C2',[],'Subtract actual from forecast in the stated order.','500 − 510 = −10 units. A negative error means underprediction in this convention.'),
   f('p02','Calculate error magnitude','ABS','In K23 calculate the absolute forecast error for week 1 directly from B2 and C2.','K23',10,'=ABS(B2-C2)',['ABS'],'Wrap the difference in ABS.','The magnitude is 10 units, whether the signed error is positive or negative.'),
   f('p03','Total forecast quantities','SUM','In K24 total the four weekly forecasts using B2:B5.','K24',2070,'=SUM(B2:B5)',['SUM'],'Include all four evaluated weeks.','500+520+540+510 = 2070 units forecast.'),
   f('p04','Total actual quantities','SUM','In K25 total actual quantities using C2:C5.','K25',1960,'=SUM(C2:C5)',['SUM'],'Use actuals rather than forecasts.','510+515+430+505 = 1960 units actually recorded.'),
   f('p05','Mean absolute error','AVERAGE','In K26 average the supplied live AbsoluteError values in E2:E5.','K26',32.5,'=AVERAGE(E2:E5)',['AVERAGE'],'Average magnitudes, not signed errors.','(10+5+110+5)/4 = 32.5 units. Errors cannot cancel in this measure.'),
   f('p06','A median needs the middle pair','MEDIAN','In K27 calculate the median actual quantity across all four weeks.','K27',507.5,'=MEDIAN(C2:C5)',['MEDIAN'],'For four values, average the two middle values after ordering.','Ordered actuals are 430,505,510,515. (505+510)/2 = 507.5 units.'),
   f('p07','Count large absolute errors','COUNTIF','In K28 count AbsoluteError values greater than 20 using E2:E5.','K28',1,'=COUNTIF(E2:E5,">20")',['COUNTIF'],'Use a quoted >20 criterion.','Only week 3 has an error magnitude above 20 units.'),
   f('p08','Look up a problem week','VLOOKUP','In K29 use exact VLOOKUP to find week 3’s AbsoluteError from A2:E5.','K29',110,'=VLOOKUP(3,A2:E5,5,FALSE)',['VLOOKUP'],'The week is in the first column and AbsoluteError is column 5.','Week 3 has |540−430| = 110 units absolute error.',{rule:{contains:['FALSE']}}),
   f('p09','Flag a threshold correctly','IF','In K30 use IF to show Review if E4 exceeds the fixed threshold J2; otherwise show Within. Lock J2.','K30','Review','=IF(E4>$J$2,"Review","Within")',['IF'],'Use > for exceeds and $J$2 for the threshold.','Week 3 exceeds 20 units. The flag prompts investigation; it does not prove a cause.',{rule:{contains:['E4','$J$2']}}),
   f('p10','Link a transparent prediction rule','Linked sheets','Stay on Forecasts. In K31 calculate the cold-drinks estimate using FutureTemp in Cold drinks!D2, Slope in E2 and Intercept in F2. Lock slope and intercept.','K31',70,"='Cold drinks'!D2*'Cold drinks'!$E$2+'Cold drinks'!$F$2",[],'Quote the sheet name because it contains a space. The rule is temperature × slope + intercept.','28×5−70 = 70 drinks. This is extrapolation beyond the observed 20–26°C range.',{kind:'linked',rule:{contains:['$E$2','$F$2']}}),
   {id:'p11',title:'Highlight errors for review',topic:'Conditional formatting',skill:'Conditional formatting',kind:'conditional',task:'On Forecasts, highlight E2:E5 when the absolute error is greater than 20.',cell:'',value:null,rule:{range:'E2:E5',operator:'gt',value:20,style:'highlight'},solution:'E2:E5; value >20; highlight',hint:'Use a condition on the error magnitude. This changes appearance, not the stored value.',why:'Week 3 should be highlighted for investigation. Do not silently delete it.'},
   {id:'p12',title:'Visualise error magnitudes',topic:'Chart selection',skill:'Chart selection',kind:'chart',task:'Clear filters. Make a column chart using Week (A) and AbsoluteError (E), with Sum in the grouped summary. Label the unit as units.',cell:'',value:null,rule:{type:'column',x:'A',y:'E',aggregate:'Sum'},solution:'Column chart; Week; Sum of AbsoluteError; units',hint:'Each week is one record, so a per-week sum is its single absolute error.',why:'The 110-unit bar makes week 3 easy to identify, without inventing a reason for the discrepancy.'}
  ]
 });
})();
