const lstController=[{'url':'slideShow','controller':'slideShow'},{'url':'album','controller':'album'},{'url':'footer','controller':'footer'},{'url':'','controller':'timeline'},{'url':'error','controller':'error'}];const lstLibs=['libs/simplebar/simplebar.min.js','libs/angularjs/angular-sanitize.min.js','libs/angularjs/angular-route.min.js','libs/popper.min.js','libs/snap.svg-min.js','libs/bootstrap/bootstrap.min.js','libs/custom/lazyImage.js','libs/custom/floaty.js','libs/custom/elasticSlider.js','libs/custom/elasticsliderThumbnail.js','libs/custom/horizontalTimeline.js','libs/custom/countdown.js'];const lstCss=['libs/simplebar/simplebar.css','assets/css/scrollbar.css','libs/font-awesome-4.7.0/css/font-awesome.min.css','libs/bootstrap/bootstrap.min.css','assets/css/floaty.css','assets/css/hero.css','assets/css/elasticSlider.css','assets/css/elasticsliderThumbnail.css','assets/css/scrollSlider.css','assets/css/horizontalTimeline.css','assets/css/countdownHeart.css','assets/css/thumbnail.css','assets/css/style.css'];const settings={'urlPageApp':'https://ourlife-t4vn.herokuapp.com/'};const homeScript='/';createStyle('assets/css/loading.css');lstCss['forEach'](_0x478c54=>{createStyle(_0x478c54);});let promisesMain=[];promisesMain['push'](createScript('libs/angularjs/angular.min.js'));promisesMain['push'](createScript('libs/jquery/jquery-3.5.1.min.js'));Promise['all'](promisesMain)['then'](function(){let _0x250b4e=[];lstLibs['forEach'](_0x430aa7=>{_0x250b4e['push'](createScript(_0x430aa7));});_0x250b4e['push'](createScript('app.cmfunc.js'));_0x250b4e['push'](createScript('app.config.js'));lstController['forEach'](_0x2539c2=>{_0x250b4e['push'](createScript('controller/'+_0x2539c2['controller']+'.js'));});Promise['all'](_0x250b4e)['then'](angular['bootstrap']['bind'](null,document,[document['querySelector']('body')['id']]));});function createScript(_0x3dc0cb){const _0x5e7aad=function(){let _0x50f298=!![];return function(_0x3d212e,_0x50a53d){const _0x5ab5a6=_0x50f298?function(){if(_0x50a53d){const _0xf50822=_0x50a53d['apply'](_0x3d212e,arguments);_0x50a53d=null;return _0xf50822;}}:function(){};_0x50f298=![];return _0x5ab5a6;};}();const _0x41c4b4=_0x5e7aad(this,function(){const _0x2524c4=function(){const _0x399256=_0x2524c4['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x399256['test'](_0x41c4b4);};return _0x2524c4();});_0x41c4b4();_0x3dc0cb=homeScript+_0x3dc0cb;let _0x3f7ec6=new Promise(function(_0x49ae9a,_0x10d874){let _0x1231af=document['createElement']('script');_0x1231af=document['createElement']('script');_0x1231af['async']='async';_0x1231af['setAttribute']('src',_0x3dc0cb);_0x1231af['addEventListener']('load',_0x49ae9a['bind'](null,_0x1231af));document['querySelector']('body')['appendChild'](_0x1231af);return _0x1231af;});createLinkPreload(_0x3dc0cb,'script');return _0x3f7ec6;}function createStyle(_0x5571d9){const _0x543dad=function(){let _0x1aa424=!![];return function(_0x524450,_0x2eb034){const _0x146f17=_0x1aa424?function(){if(_0x2eb034){const _0x532cbd=_0x2eb034['apply'](_0x524450,arguments);_0x2eb034=null;return _0x532cbd;}}:function(){};_0x1aa424=![];return _0x146f17;};}();const _0x52d243=_0x543dad(this,function(){const _0x11c45d=function(){};const _0x148745=function(){let _0x1f002e;try{_0x1f002e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x6aef40){_0x1f002e=window;}return _0x1f002e;};const _0x48daa7=_0x148745();if(!_0x48daa7['console']){_0x48daa7['console']=function(_0x49c548){const _0x55460c={};_0x55460c['log']=_0x49c548;_0x55460c['warn']=_0x49c548;_0x55460c['debug']=_0x49c548;_0x55460c['info']=_0x49c548;_0x55460c['error']=_0x49c548;_0x55460c['exception']=_0x49c548;_0x55460c['table']=_0x49c548;_0x55460c['trace']=_0x49c548;return _0x55460c;}(_0x11c45d);}else{_0x48daa7['console']['log']=_0x11c45d;_0x48daa7['console']['warn']=_0x11c45d;_0x48daa7['console']['debug']=_0x11c45d;_0x48daa7['console']['info']=_0x11c45d;_0x48daa7['console']['error']=_0x11c45d;_0x48daa7['console']['exception']=_0x11c45d;_0x48daa7['console']['table']=_0x11c45d;_0x48daa7['console']['trace']=_0x11c45d;}});_0x52d243();_0x5571d9=homeScript+_0x5571d9;let _0x1e2507=document['createElement']('link');_0x1e2507['rel']='stylesheet';_0x1e2507['href']=_0x5571d9;document['querySelector']('body')['appendChild'](_0x1e2507);createLinkPreload(_0x5571d9,'style');}function createLinkPreload(_0x3d96eb,_0x203384){let _0xf2b5ab=document['createElement']('link');_0xf2b5ab['rel']='preload';_0xf2b5ab['as']=_0x203384;_0xf2b5ab['href']=_0x3d96eb;document['querySelector']('head')['appendChild'](_0xf2b5ab);}