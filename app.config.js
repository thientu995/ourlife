const _0x5aede7=function(){let _0x1395bf=!![];return function(_0x2888ec,_0x49da4b){const _0x5dca69=_0x1395bf?function(){if(_0x49da4b){const _0x172117=_0x49da4b['apply'](_0x2888ec,arguments);_0x49da4b=null;return _0x172117;}}:function(){};_0x1395bf=![];return _0x5dca69;};}();const _0x3dec89=_0x5aede7(this,function(){const _0x2d78c9=function(){const _0xb5b87a=_0x2d78c9['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0xb5b87a['test'](_0x3dec89);};return _0x2d78c9();});_0x3dec89();const _0x3046bf=function(){let _0x4de00f=!![];return function(_0x1ef547,_0xec28a8){const _0x327bb5=_0x4de00f?function(){if(_0xec28a8){const _0x1416eb=_0xec28a8['apply'](_0x1ef547,arguments);_0xec28a8=null;return _0x1416eb;}}:function(){};_0x4de00f=![];return _0x327bb5;};}();const _0x3320e4=_0x3046bf(this,function(){const _0x55ec20=function(){};let _0x16d252;try{const _0x4ae263=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x16d252=_0x4ae263();}catch(_0x121355){_0x16d252=window;}if(!_0x16d252['console']){_0x16d252['console']=function(_0x4db860){const _0x21bc63={};_0x21bc63['log']=_0x4db860;_0x21bc63['warn']=_0x4db860;_0x21bc63['debug']=_0x4db860;_0x21bc63['info']=_0x4db860;_0x21bc63['error']=_0x4db860;_0x21bc63['exception']=_0x4db860;_0x21bc63['table']=_0x4db860;_0x21bc63['trace']=_0x4db860;return _0x21bc63;}(_0x55ec20);}else{_0x16d252['console']['log']=_0x55ec20;_0x16d252['console']['warn']=_0x55ec20;_0x16d252['console']['debug']=_0x55ec20;_0x16d252['console']['info']=_0x55ec20;_0x16d252['console']['error']=_0x55ec20;_0x16d252['console']['exception']=_0x55ec20;_0x16d252['console']['table']=_0x55ec20;_0x16d252['console']['trace']=_0x55ec20;}});_0x3320e4();window['app']=angular['module'](document['querySelector']('body')['id'],['ngRoute','ngSanitize']);app['config'](['$sceDelegateProvider','$routeProvider',function(_0x487574,_0x11db71){_0x487574['resourceUrlWhitelist'](['self']);lstController['forEach'](_0x3ec284=>{_0x11db71['when']('/'+_0x3ec284['url'],{'templateUrl':'./views/'+_0x3ec284['controller']+'.html','controller':_0x3ec284['controller']+'Controller'});});_0x11db71['otherwise']('/');;}]);app['run'](['$window','$rootScope','$http',function(_0x3b0136,_0x439b5c,_0x51167e){_0x439b5c['getData']=function(_0x365e7f,_0x3338ce){_0x51167e['post'](settings['urlPageApp']+'get',_0x365e7f)['then'](_0x3338ce);};new Floaty('#floatyMenu',{'onActivate':function(){if(!$('.floatyMenuContainer')['hasClass']('active')){simpleBarBody['getScrollElement']()['scrollTo'](0x0,$('header')['outerHeight']());}$('.floatyMenuContainer,.button-floaty')['toggleClass']('active');}});_0x439b5c['getData']({'collection':'setting','doc':'tagMeta'},function(_0x3d74eb){const _0x4c162a=_0x3d74eb['data'];console['log'](_0x4c162a);_0x439b5c['pageTitle']=_0x4c162a['title'];_0x439b5c['pageDescription']=_0x4c162a['description'];_0x3b0136['document']['querySelector']('title')['innerHTML']=_0x439b5c['pageTitle'];});_0x439b5c['isViewLoading']=![];_0x439b5c['$on']('$routeChangeStart',function(){_0x439b5c['isViewLoading']=!![];});_0x439b5c['$on']('$routeChangeSuccess',function(){window['dispatchEvent'](new Event('resize'));});_0x439b5c['$on']('$routeChangeError',function(){window['dispatchEvent'](new Event('resize'));});}]);