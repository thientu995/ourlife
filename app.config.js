const _0x20c364=function(){let _0x51c611=!![];return function(_0x396cd5,_0x296fe2){const _0x254f2d=_0x51c611?function(){if(_0x296fe2){const _0x28d7a4=_0x296fe2['apply'](_0x396cd5,arguments);_0x296fe2=null;return _0x28d7a4;}}:function(){};_0x51c611=![];return _0x254f2d;};}();const _0x5cbcbe=_0x20c364(this,function(){const _0x5ba112=function(){const _0x1e5340=_0x5ba112['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x1e5340['test'](_0x5cbcbe);};return _0x5ba112();});_0x5cbcbe();const _0x54f72f=function(){let _0x2920b1=!![];return function(_0x567cfe,_0x3db719){const _0x3c3be6=_0x2920b1?function(){if(_0x3db719){const _0x163c15=_0x3db719['apply'](_0x567cfe,arguments);_0x3db719=null;return _0x163c15;}}:function(){};_0x2920b1=![];return _0x3c3be6;};}();const _0x7fbd46=_0x54f72f(this,function(){const _0x1560e0=function(){};const _0x1c4574=function(){let _0x15a95a;try{_0x15a95a=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x10a940){_0x15a95a=window;}return _0x15a95a;};const _0x5f0a7a=_0x1c4574();if(!_0x5f0a7a['console']){_0x5f0a7a['console']=function(_0x2dc3c0){const _0x2e1da8={};_0x2e1da8['log']=_0x2dc3c0;_0x2e1da8['warn']=_0x2dc3c0;_0x2e1da8['debug']=_0x2dc3c0;_0x2e1da8['info']=_0x2dc3c0;_0x2e1da8['error']=_0x2dc3c0;_0x2e1da8['exception']=_0x2dc3c0;_0x2e1da8['table']=_0x2dc3c0;_0x2e1da8['trace']=_0x2dc3c0;return _0x2e1da8;}(_0x1560e0);}else{_0x5f0a7a['console']['log']=_0x1560e0;_0x5f0a7a['console']['warn']=_0x1560e0;_0x5f0a7a['console']['debug']=_0x1560e0;_0x5f0a7a['console']['info']=_0x1560e0;_0x5f0a7a['console']['error']=_0x1560e0;_0x5f0a7a['console']['exception']=_0x1560e0;_0x5f0a7a['console']['table']=_0x1560e0;_0x5f0a7a['console']['trace']=_0x1560e0;}});_0x7fbd46();app['config'](['$sceDelegateProvider','$routeProvider',function(_0x493ad7,_0x313548){_0x493ad7['resourceUrlWhitelist'](['self']);lstController['forEach'](_0x1ebba1=>{_0x313548['when'](_0x1ebba1['url'],{'templateUrl':'./views/'+_0x1ebba1['controller']+'.html','controller':_0x1ebba1['controller']+'Controller'});});_0x313548['otherwise']('/');;}]);app['run'](['$window','$rootScope',function(_0x2a1315,_0x391761){databaseProject['collection']('setting')['doc']('tagMeta')['get']()['then'](_0x5a92e6=>{const _0x5632f3=_0x5a92e6['data']();_0x391761['pageTitle']=_0x5632f3['title'];_0x391761['pageDescription']=_0x5632f3['description'];_0x2a1315['document']['querySelector']('title')['innerHTML']=_0x391761['pageTitle'];});_0x2a1315['document']['getElementById']('loading')['style']['display']='none';}]);