var _0x26d75d=function(){var _0x408492=!![];return function(_0xaeca04,_0x212807){var _0x2d58cd=_0x408492?function(){if(_0x212807){var _0x615358=_0x212807['apply'](_0xaeca04,arguments);_0x212807=null;return _0x615358;}}:function(){};_0x408492=![];return _0x2d58cd;};}();var _0x5a97d4=_0x26d75d(this,function(){var _0x366386=function(){var _0x1308c8=_0x366386['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x1308c8['test'](_0x5a97d4);};return _0x366386();});_0x5a97d4();var _0x673d9e=function(){var _0xab1a76=!![];return function(_0x4d4016,_0x2c3d60){var _0x58561c=_0xab1a76?function(){if(_0x2c3d60){var _0x170bd5=_0x2c3d60['apply'](_0x4d4016,arguments);_0x2c3d60=null;return _0x170bd5;}}:function(){};_0xab1a76=![];return _0x58561c;};}();var _0x11d1a4=_0x673d9e(this,function(){var _0x22370d=function(){};var _0x252922=function(){var _0x5a0d09;try{_0x5a0d09=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x1f2ce8){_0x5a0d09=window;}return _0x5a0d09;};var _0x1d260d=_0x252922();if(!_0x1d260d['console']){_0x1d260d['console']=function(_0x27a3c0){var _0x3973c0={};_0x3973c0['log']=_0x27a3c0;_0x3973c0['warn']=_0x27a3c0;_0x3973c0['debug']=_0x27a3c0;_0x3973c0['info']=_0x27a3c0;_0x3973c0['error']=_0x27a3c0;_0x3973c0['exception']=_0x27a3c0;_0x3973c0['table']=_0x27a3c0;_0x3973c0['trace']=_0x27a3c0;return _0x3973c0;}(_0x22370d);}else{_0x1d260d['console']['log']=_0x22370d;_0x1d260d['console']['warn']=_0x22370d;_0x1d260d['console']['debug']=_0x22370d;_0x1d260d['console']['info']=_0x22370d;_0x1d260d['console']['error']=_0x22370d;_0x1d260d['console']['exception']=_0x22370d;_0x1d260d['console']['table']=_0x22370d;_0x1d260d['console']['trace']=_0x22370d;}});_0x11d1a4();app['controller']('footerController',['$scope','$http','$window',function(_0x2aae41){databaseProject['collection']('setting')['doc']('footer')['get']()['then'](_0xc6e577=>{_0x2aae41['$apply'](function(){_0x2aae41['footer']=_0xc6e577['data']()['src'];_0x2aae41['text']=_0xc6e577['data']()['text'];});});_0x2aae41['image']=function(){if(_0x2aae41['footer']){return{'background-image':'url(\x22'+_0x2aae41['footer']+'\x22)'};}return{};};}]);