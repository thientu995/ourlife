const _0x44bfe5=function(){let _0x5f559f=!![];return function(_0x59bc00,_0x1d712b){const _0x1a298c=_0x5f559f?function(){if(_0x1d712b){const _0x72f5aa=_0x1d712b['apply'](_0x59bc00,arguments);_0x1d712b=null;return _0x72f5aa;}}:function(){};_0x5f559f=![];return _0x1a298c;};}();const _0x2f12c8=_0x44bfe5(this,function(){const _0x53ffcf=function(){const _0x4b8066=_0x53ffcf['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x4b8066['test'](_0x2f12c8);};return _0x53ffcf();});_0x2f12c8();const _0x323e04=function(){let _0x1f749c=!![];return function(_0x13c556,_0x190e44){const _0x32f76f=_0x1f749c?function(){if(_0x190e44){const _0x17b720=_0x190e44['apply'](_0x13c556,arguments);_0x190e44=null;return _0x17b720;}}:function(){};_0x1f749c=![];return _0x32f76f;};}();const _0x48e3a0=_0x323e04(this,function(){const _0x31bc95=function(){};const _0x4f4828=function(){let _0x4eacc1;try{_0x4eacc1=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x5d5196){_0x4eacc1=window;}return _0x4eacc1;};const _0x5baebe=_0x4f4828();if(!_0x5baebe['console']){_0x5baebe['console']=function(_0x447a68){const _0x3a838e={};_0x3a838e['log']=_0x447a68;_0x3a838e['warn']=_0x447a68;_0x3a838e['debug']=_0x447a68;_0x3a838e['info']=_0x447a68;_0x3a838e['error']=_0x447a68;_0x3a838e['exception']=_0x447a68;_0x3a838e['table']=_0x447a68;_0x3a838e['trace']=_0x447a68;return _0x3a838e;}(_0x31bc95);}else{_0x5baebe['console']['log']=_0x31bc95;_0x5baebe['console']['warn']=_0x31bc95;_0x5baebe['console']['debug']=_0x31bc95;_0x5baebe['console']['info']=_0x31bc95;_0x5baebe['console']['error']=_0x31bc95;_0x5baebe['console']['exception']=_0x31bc95;_0x5baebe['console']['table']=_0x31bc95;_0x5baebe['console']['trace']=_0x31bc95;}});_0x48e3a0();app['controller']('slideShowController',['$scope','$http','$window','$timeout','$interval',function(_0x177da2,_0x5687c6,_0x3e2e88,_0x6106e,_0x88af7){_0x177da2['dataArray']=[];const _0x59e6b0=0x4;_0x177da2['animation']=function(_0x158da4){return{'animation-delay':_0x158da4*_0x59e6b0+'s','animation-duration':_0x177da2['dataArray']['length']*_0x59e6b0+'s'};};_0x5687c6['get']('/data/slideshow.json')['then'](_0x8eb63f=>{_0x177da2['dataArray']=_0x8eb63f['data'];});}]);