const _0x4dcc22=function(){let _0x33ad2c=!![];return function(_0x1040ed,_0x496ee2){const _0x41bd75=_0x33ad2c?function(){if(_0x496ee2){const _0x1dda62=_0x496ee2['apply'](_0x1040ed,arguments);_0x496ee2=null;return _0x1dda62;}}:function(){};_0x33ad2c=![];return _0x41bd75;};}();const _0xf331d7=_0x4dcc22(this,function(){const _0x36f02b=function(){const _0x406d89=_0x36f02b['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x406d89['test'](_0xf331d7);};return _0x36f02b();});_0xf331d7();const _0xbd418b=function(){let _0x42a48c=!![];return function(_0x46fe2b,_0x52623a){const _0x557c32=_0x42a48c?function(){if(_0x52623a){const _0xb549d0=_0x52623a['apply'](_0x46fe2b,arguments);_0x52623a=null;return _0xb549d0;}}:function(){};_0x42a48c=![];return _0x557c32;};}();const _0x930b16=_0xbd418b(this,function(){const _0x150afc=function(){};const _0x235aef=function(){let _0x369679;try{_0x369679=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x4a4336){_0x369679=window;}return _0x369679;};const _0x21cbcc=_0x235aef();if(!_0x21cbcc['console']){_0x21cbcc['console']=function(_0x4e5ff3){const _0x39bb89={};_0x39bb89['log']=_0x4e5ff3;_0x39bb89['warn']=_0x4e5ff3;_0x39bb89['debug']=_0x4e5ff3;_0x39bb89['info']=_0x4e5ff3;_0x39bb89['error']=_0x4e5ff3;_0x39bb89['exception']=_0x4e5ff3;_0x39bb89['table']=_0x4e5ff3;_0x39bb89['trace']=_0x4e5ff3;return _0x39bb89;}(_0x150afc);}else{_0x21cbcc['console']['log']=_0x150afc;_0x21cbcc['console']['warn']=_0x150afc;_0x21cbcc['console']['debug']=_0x150afc;_0x21cbcc['console']['info']=_0x150afc;_0x21cbcc['console']['error']=_0x150afc;_0x21cbcc['console']['exception']=_0x150afc;_0x21cbcc['console']['table']=_0x150afc;_0x21cbcc['console']['trace']=_0x150afc;}});_0x930b16();window['app']=angular['module'](document['querySelector']('body')['id'],['ngRoute','ngSanitize']);app['config'](['$sceDelegateProvider','$routeProvider',function(_0x2843dd,_0x1a1605){_0x2843dd['resourceUrlWhitelist'](['self']);lstController['forEach'](_0x2e29ed=>{_0x1a1605['when']('/'+_0x2e29ed['url'],{'templateUrl':'./views/'+_0x2e29ed['controller']+'.html','controller':_0x2e29ed['controller']+'Controller'});});_0x1a1605['otherwise']('/');;}]);app['run'](['$window','$rootScope','$http',function(_0x413064,_0x5529ba,_0x3fe8aa){_0x5529ba['getData']=function(_0x52ddf7,_0x3252e0){_0x3fe8aa['post'](settings['urlPageApp']+'get',_0x52ddf7)['then'](_0x3252e0);};new Floaty('#floatyMenu',{'onActivate':function(){if(!$('.floatyMenuContainer')['hasClass']('active')){simpleBarBody['getScrollElement']()['scrollTo'](0x0,$('header')['outerHeight']());}$('.floatyMenuContainer,.button-floaty')['toggleClass']('active');}});_0x5529ba['getData']({'collection':'setting','doc':'tagMeta'},function(_0x25fbb7){const _0x2ee2fd=_0x25fbb7['data'];console['log'](_0x2ee2fd);_0x5529ba['pageTitle']=_0x2ee2fd['title'];_0x5529ba['pageDescription']=_0x2ee2fd['description'];_0x413064['document']['querySelector']('title')['innerHTML']=_0x5529ba['pageTitle'];});_0x5529ba['isViewLoading']=![];_0x5529ba['$on']('$routeChangeStart',function(){_0x5529ba['isViewLoading']=!![];});_0x5529ba['$on']('$routeChangeSuccess',function(){window['dispatchEvent'](new Event('resize'));});_0x5529ba['$on']('$routeChangeError',function(){window['dispatchEvent'](new Event('resize'));});}]);