const _0x190fd2=function(){let _0x30ec7e=!![];return function(_0x14dc86,_0x5d0ed6){const _0x23e17b=_0x30ec7e?function(){if(_0x5d0ed6){const _0x457488=_0x5d0ed6['apply'](_0x14dc86,arguments);_0x5d0ed6=null;return _0x457488;}}:function(){};_0x30ec7e=![];return _0x23e17b;};}();const _0x49b14a=_0x190fd2(this,function(){const _0x342f20=function(){const _0x4b07d7=_0x342f20['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x4b07d7['test'](_0x49b14a);};return _0x342f20();});_0x49b14a();const _0x25309a=function(){let _0x6baa73=!![];return function(_0x49c480,_0x47c66f){const _0x463131=_0x6baa73?function(){if(_0x47c66f){const _0x653e9a=_0x47c66f['apply'](_0x49c480,arguments);_0x47c66f=null;return _0x653e9a;}}:function(){};_0x6baa73=![];return _0x463131;};}();const _0x5c577e=_0x25309a(this,function(){const _0x1b9827=function(){};const _0x477b94=function(){let _0x5c9ded;try{_0x5c9ded=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x210533){_0x5c9ded=window;}return _0x5c9ded;};const _0xe3c346=_0x477b94();if(!_0xe3c346['console']){_0xe3c346['console']=function(_0x53a21e){const _0x4fab28={};_0x4fab28['log']=_0x53a21e;_0x4fab28['warn']=_0x53a21e;_0x4fab28['debug']=_0x53a21e;_0x4fab28['info']=_0x53a21e;_0x4fab28['error']=_0x53a21e;_0x4fab28['exception']=_0x53a21e;_0x4fab28['table']=_0x53a21e;_0x4fab28['trace']=_0x53a21e;return _0x4fab28;}(_0x1b9827);}else{_0xe3c346['console']['log']=_0x1b9827;_0xe3c346['console']['warn']=_0x1b9827;_0xe3c346['console']['debug']=_0x1b9827;_0xe3c346['console']['info']=_0x1b9827;_0xe3c346['console']['error']=_0x1b9827;_0xe3c346['console']['exception']=_0x1b9827;_0xe3c346['console']['table']=_0x1b9827;_0xe3c346['console']['trace']=_0x1b9827;}});_0x5c577e();const lstController=[{'url':'slideShow','controller':'slideShow'},{'url':'footer','controller':'footer'},{'url':'/','controller':'timeline'},{'url':'error','controller':'error'}];const lstLibs=['./libs/angularjs/angular-sanitize.min.js','./libs/angularjs/angular-route.min.js','./libs/popper.min.js','./libs/snap.svg-min.js','./libs/bootstrap/bootstrap.min.js','./libs/custom/elasticSlider.js','./libs/custom/horizontalTimeline.js','./libs/custom/countdown.js'];const lstCss=['./assets/css/scrollbar.css','./libs/font-awesome-4.7.0/css/font-awesome.min.css','./libs/bootstrap/bootstrap.min.css','./assets/css/hero.css','./assets/css/elasticSlider.css','./assets/css/scrollSlider.css','./assets/css/horizontalTimeline.css','./assets/css/countdownHeart.css','./assets/css/style.css'];firebase['initializeApp']({'apiKey':'AIzaSyBcJ-Sc3Sc4cGVJBsy-51Sx-XFkux_6wHA','authDomain':'ourlife-t4vn.firebaseapp.com','databaseURL':'https://ourlife-t4vn.firebaseio.com','projectId':'ourlife-t4vn','storageBucket':'ourlife-t4vn.appspot.com','messagingSenderId':'655110589783','appId':'1:655110589783:web:263f20d1fe4d4b02f94212','measurementId':'G-FB8LEED8SN'});const app=angular['module'](document['querySelector']('body')['id'],['ngRoute','ngSanitize']);const databaseProject=firebase['firestore']();const settings={'urlPageApp':'https://ourlife-t4vn.herokuapp.com/'};window['addEventListener']('DOMContentLoaded',function(){new SimpleBar(document['querySelector']('body'),{'autoHide':![]});let _0x966b2e=[];lstLibs['forEach'](_0x4879eb=>{_0x966b2e['push'](_0x130801(_0x4879eb));});_0x966b2e['push'](_0x130801('./app.cmfunc.js'));_0x966b2e['push'](_0x130801('./app.config.js'));lstController['forEach'](_0x3e59ca=>{_0x966b2e['push'](_0x130801('./controller/'+_0x3e59ca['controller']+'.js'));});lstCss['forEach'](_0x1b2d56=>{_0x4676ba(_0x1b2d56);});Promise['all'](_0x966b2e)['then'](angular['bootstrap']['bind'](null,document,[document['querySelector']('body')['id']]));return;function _0x130801(_0x8ff434){let _0x4d1991=new Promise(function(_0x5c582a,_0x176f66){let _0x5f3d3e=document['createElement']('script');_0x5f3d3e=document['createElement']('script');_0x5f3d3e['defer']='defer';_0x5f3d3e['setAttribute']('src',_0x8ff434);_0x5f3d3e['addEventListener']('load',_0x5c582a['bind'](null,_0x5f3d3e));document['querySelector']('body')['appendChild'](_0x5f3d3e);return _0x5f3d3e;});return _0x4d1991;}function _0x4676ba(_0x138bf3){let _0x22d57d=document['createElement']('link');_0x22d57d['rel']='stylesheet';_0x22d57d['href']=_0x138bf3;document['querySelector']('body')['appendChild'](_0x22d57d);}});