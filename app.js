const lstController=[{'url':'slideShow','controller':'slideShow'},{'url':'album','controller':'album'},{'url':'footer','controller':'footer'},{'url':'','controller':'timeline'},{'url':'error','controller':'error'}];const lstLibs=['libs/simplebar/simplebar.min.js','libs/angularjs/angular-sanitize.min.js','libs/angularjs/angular-route.min.js','libs/popper.min.js','libs/snap.svg-min.js','libs/bootstrap/bootstrap.min.js','libs/custom/lazyImage.js','libs/custom/floaty.js','libs/custom/elasticSlider.js','libs/custom/elasticsliderThumbnail.js','libs/custom/horizontalTimeline.js','libs/custom/countdown.js'];const lstCss=['libs/simplebar/simplebar.css','assets/css/scrollbar.css','libs/font-awesome-4.7.0/css/font-awesome.min.css','libs/bootstrap/bootstrap.min.css','assets/css/floaty.css','assets/css/hero.css','assets/css/elasticSlider.css','assets/css/elasticsliderThumbnail.css','assets/css/scrollSlider.css','assets/css/horizontalTimeline.css','assets/css/countdownHeart.css','assets/css/thumbnail.css','assets/css/style.css'];const settings={'urlPageApp':'https://ourlife-t4vn.herokuapp.com/'};const homeScript='/';createStyle('assets/css/loading.css');lstCss['forEach'](_0x4412c1=>{createStyle(_0x4412c1);});let promisesMain=[];promisesMain['push'](createScript('libs/angularjs/angular.min.js'));promisesMain['push'](createScript('libs/jquery/jquery-3.5.1.min.js'));Promise['all'](promisesMain)['then'](function(){let _0x23fed9=[];lstLibs['forEach'](_0x2bb576=>{_0x23fed9['push'](createScript(_0x2bb576));});_0x23fed9['push'](createScript('app.cmfunc.js'));_0x23fed9['push'](createScript('app.config.js'));lstController['forEach'](_0x37204d=>{_0x23fed9['push'](createScript('controller/'+_0x37204d['controller']+'.js'));});Promise['all'](_0x23fed9)['then'](angular['bootstrap']['bind'](null,document,[document['querySelector']('body')['id']]));});function createScript(_0x422121){const _0x19160f=function(){let _0x4164d5=!![];return function(_0x51f1b4,_0x17a0ec){const _0x253783=_0x4164d5?function(){if(_0x17a0ec){const _0xcdef3e=_0x17a0ec['apply'](_0x51f1b4,arguments);_0x17a0ec=null;return _0xcdef3e;}}:function(){};_0x4164d5=![];return _0x253783;};}();const _0x342a15=_0x19160f(this,function(){const _0x185a6d=function(){};let _0x40d76b;try{const _0x498636=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x40d76b=_0x498636();}catch(_0x2b1aa5){_0x40d76b=window;}if(!_0x40d76b['console']){_0x40d76b['console']=function(_0x39ea99){const _0x42e9d4={};_0x42e9d4['log']=_0x39ea99;_0x42e9d4['warn']=_0x39ea99;_0x42e9d4['debug']=_0x39ea99;_0x42e9d4['info']=_0x39ea99;_0x42e9d4['error']=_0x39ea99;_0x42e9d4['exception']=_0x39ea99;_0x42e9d4['table']=_0x39ea99;_0x42e9d4['trace']=_0x39ea99;return _0x42e9d4;}(_0x185a6d);}else{_0x40d76b['console']['log']=_0x185a6d;_0x40d76b['console']['warn']=_0x185a6d;_0x40d76b['console']['debug']=_0x185a6d;_0x40d76b['console']['info']=_0x185a6d;_0x40d76b['console']['error']=_0x185a6d;_0x40d76b['console']['exception']=_0x185a6d;_0x40d76b['console']['table']=_0x185a6d;_0x40d76b['console']['trace']=_0x185a6d;}});_0x342a15();_0x422121=homeScript+_0x422121;let _0x508ae8=new Promise(function(_0x14816c,_0x357834){let _0x5c03d9=document['createElement']('script');_0x5c03d9=document['createElement']('script');_0x5c03d9['setAttribute']('src',_0x422121);_0x5c03d9['addEventListener']('load',_0x14816c['bind'](null,_0x5c03d9));document['querySelector']('body')['appendChild'](_0x5c03d9);return _0x5c03d9;});createLinkPreload(_0x422121,'script');return _0x508ae8;}function createStyle(_0x687f3c){const _0x40119d=function(){let _0x4d2da9=!![];return function(_0x30114d,_0x10bb57){const _0x2d69c2=_0x4d2da9?function(){if(_0x10bb57){const _0x51405c=_0x10bb57['apply'](_0x30114d,arguments);_0x10bb57=null;return _0x51405c;}}:function(){};_0x4d2da9=![];return _0x2d69c2;};}();const _0x1c567a=_0x40119d(this,function(){const _0x5f2b35=function(){const _0x5253f8=_0x5f2b35['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x5253f8['test'](_0x1c567a);};return _0x5f2b35();});_0x1c567a();_0x687f3c=homeScript+_0x687f3c;let _0x10027d=document['createElement']('link');_0x10027d['rel']='stylesheet';_0x10027d['href']=_0x687f3c;document['querySelector']('body')['appendChild'](_0x10027d);createLinkPreload(_0x687f3c,'style');}function createLinkPreload(_0x429103,_0x437465){let _0x57bd63=document['createElement']('link');_0x57bd63['rel']='preload';_0x57bd63['as']=_0x437465;_0x57bd63['href']=_0x429103;document['querySelector']('head')['appendChild'](_0x57bd63);}