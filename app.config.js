const _0x47d925=function(){let _0x381ac4=!![];return function(_0x18bdae,_0x16c6f7){const _0x558edd=_0x381ac4?function(){if(_0x16c6f7){const _0x24d1a0=_0x16c6f7['apply'](_0x18bdae,arguments);_0x16c6f7=null;return _0x24d1a0;}}:function(){};_0x381ac4=![];return _0x558edd;};}();const _0x2a5e6f=_0x47d925(this,function(){const _0x1d5697=function(){const _0x3aef01=_0x1d5697['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x3aef01['test'](_0x2a5e6f);};return _0x1d5697();});_0x2a5e6f();const _0x4e426f=function(){let _0x47faad=!![];return function(_0x29abb6,_0x3114be){const _0x59a504=_0x47faad?function(){if(_0x3114be){const _0x19d70e=_0x3114be['apply'](_0x29abb6,arguments);_0x3114be=null;return _0x19d70e;}}:function(){};_0x47faad=![];return _0x59a504;};}();const _0x1b3961=_0x4e426f(this,function(){const _0x2df50c=function(){};let _0x238413;try{const _0x4fa562=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x238413=_0x4fa562();}catch(_0x855a5){_0x238413=window;}if(!_0x238413['console']){_0x238413['console']=function(_0x36af95){const _0x54cc04={};_0x54cc04['log']=_0x36af95;_0x54cc04['warn']=_0x36af95;_0x54cc04['debug']=_0x36af95;_0x54cc04['info']=_0x36af95;_0x54cc04['error']=_0x36af95;_0x54cc04['exception']=_0x36af95;_0x54cc04['table']=_0x36af95;_0x54cc04['trace']=_0x36af95;return _0x54cc04;}(_0x2df50c);}else{_0x238413['console']['log']=_0x2df50c;_0x238413['console']['warn']=_0x2df50c;_0x238413['console']['debug']=_0x2df50c;_0x238413['console']['info']=_0x2df50c;_0x238413['console']['error']=_0x2df50c;_0x238413['console']['exception']=_0x2df50c;_0x238413['console']['table']=_0x2df50c;_0x238413['console']['trace']=_0x2df50c;}});_0x1b3961();app['config'](['$sceDelegateProvider','$routeProvider',function(_0x29129e,_0x2d386d){_0x29129e['resourceUrlWhitelist'](['self']);lstController['forEach'](_0x27731b=>{_0x2d386d['when']('/'+_0x27731b['url'],{'templateUrl':'./views/'+_0x27731b['controller']+'.html','controller':_0x27731b['controller']+'Controller'});});_0x2d386d['otherwise']('/');;}]);app['run'](['$window','$rootScope','$http',function(_0x221db7,_0x4df150,_0x2139bc){_0x4df150['getData']=function(_0x3500fc,_0x221768){_0x2139bc['post'](settings['urlPageApp']+'get',_0x3500fc)['then'](_0x221768);};new SimpleBar(document['querySelector']('.floatyMenuWrapper'),{'autoHide':![]});new Floaty('#floatyMenu',{'onActivate':function(){if(!$('.floatyMenuContainer')['hasClass']('active')){simpleBarBody['getScrollElement']()['scrollTo'](0x0,$('header')['outerHeight']());}$('.floatyMenuContainer,.button-floaty')['toggleClass']('active');}});_0x4df150['getData']({'collection':'setting','doc':'tagMeta'},function(_0x347077){const _0x35e366=_0x347077['data'];_0x4df150['pageTitle']=_0x35e366['title'];_0x4df150['pageDescription']=_0x35e366['description'];_0x221db7['document']['querySelector']('title')['innerHTML']=_0x4df150['pageTitle'];});_0x4df150['isViewLoading']=![];_0x4df150['$on']('$routeChangeStart',function(){_0x4df150['isViewLoading']=!![];});_0x4df150['$on']('$routeChangeSuccess',function(){window['dispatchEvent'](new Event('resize'));});_0x4df150['$on']('$routeChangeError',function(){window['dispatchEvent'](new Event('resize'));});}]);