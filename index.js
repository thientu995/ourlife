const _0x3114bb=function(){let _0x2610b9=!![];return function(_0x11aeb9,_0x452c3d){const _0x4e327b=_0x2610b9?function(){if(_0x452c3d){const _0x25e6b4=_0x452c3d['apply'](_0x11aeb9,arguments);_0x452c3d=null;return _0x25e6b4;}}:function(){};_0x2610b9=![];return _0x4e327b;};}();const _0x5896cc=_0x3114bb(this,function(){const _0x435942=function(){const _0x5f1fc3=_0x435942['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x5f1fc3['test'](_0x5896cc);};return _0x435942();});_0x5896cc();const _0x4395bd=function(){let _0x48ef4f=!![];return function(_0x27db7e,_0x27ad2d){const _0x1376a9=_0x48ef4f?function(){if(_0x27ad2d){const _0x428188=_0x27ad2d['apply'](_0x27db7e,arguments);_0x27ad2d=null;return _0x428188;}}:function(){};_0x48ef4f=![];return _0x1376a9;};}();const _0x323e04=_0x4395bd(this,function(){const _0x465f11=function(){};const _0x1e0271=function(){let _0x243047;try{_0x243047=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x53aca3){_0x243047=window;}return _0x243047;};const _0x69658e=_0x1e0271();if(!_0x69658e['console']){_0x69658e['console']=function(_0x43fed3){const _0x363bda={};_0x363bda['log']=_0x43fed3;_0x363bda['warn']=_0x43fed3;_0x363bda['debug']=_0x43fed3;_0x363bda['info']=_0x43fed3;_0x363bda['error']=_0x43fed3;_0x363bda['exception']=_0x43fed3;_0x363bda['table']=_0x43fed3;_0x363bda['trace']=_0x43fed3;return _0x363bda;}(_0x465f11);}else{_0x69658e['console']['log']=_0x465f11;_0x69658e['console']['warn']=_0x465f11;_0x69658e['console']['debug']=_0x465f11;_0x69658e['console']['info']=_0x465f11;_0x69658e['console']['error']=_0x465f11;_0x69658e['console']['exception']=_0x465f11;_0x69658e['console']['table']=_0x465f11;_0x69658e['console']['trace']=_0x465f11;}});_0x323e04();const serviceApp=require('./app.service');const path=require('path');const compression=require('compression');const express=require('express');const cors=require('cors');const functions=require('firebase-functions');const admin=require('firebase-admin');const flatCache=require('flat-cache');let flatCacheMiddleware=(_0x2b75c9,_0x164fd5,_0xf852dd)=>{let _0x141c60=new Date()['getFullYear']()+'';_0x141c60+=new Date()['getMonth']()+'';_0x141c60+=new Date()['getDate']()+'';let _0x2698af=(_0x2b75c9['originalUrl']||_0x2b75c9['url'])['replace'](new RegExp('/','g'),'');let _0xedf102=JSON['stringify'](_0x2b75c9['body']||'');_0xedf102=_0xedf102['replace'](new RegExp('\x22','g'),'_')['replace'](new RegExp(':','g'),'')['replace'](new RegExp('{','g'),'')['replace'](new RegExp('}','g'),'')['replace'](new RegExp(',','g'),'')['replace'](new RegExp('/','g'),'');_0xedf102=_0x141c60+'/'+_0x2698af+'/'+_0xedf102;let _0x3b84bc=flatCache['load'](_0xedf102,path['resolve']('./cache'));let _0x507bd3=_0x3b84bc['getKey'](_0xedf102);if(_0x507bd3){_0x164fd5['send'](_0x507bd3);}else{_0x164fd5['sendResponse']=_0x164fd5['send'];_0x164fd5['send']=_0x4906e0=>{_0x3b84bc['setKey'](_0xedf102,_0x4906e0);_0x3b84bc['save']();_0x164fd5['sendResponse'](_0x4906e0);};_0xf852dd();}};admin['initializeApp']({'credential':admin['credential']['cert'](serviceApp['FirebaseAdminSDK']),'databaseURL':'https://ourlife-t4vn.firebaseio.com'});let host='http://localhost';let port=process['env']['PORT']||0x2328;const start=process['platform']=='darwin'?'open':process['platform']=='win32'?'start':'xdg-open';const app=express();const pathHome=path['join'](__dirname,'./');app['use'](cors({'origin':!![]}));app['use'](express['static'](pathHome,{'maxAge':'3600000'}));app['use'](express['urlencoded']());app['use'](express['json']());app['use'](compression({'filter':function(){return!![];}}));app['use'](function(_0x5159b0,_0x52b17c,_0x397e11){var _0x2c7e68=['localhost','t4vn.com'];var _0x4b9db4=_0x5159b0['headers']['origin'];if(_0x2c7e68['indexOf'](_0x4b9db4)>-0x1){_0x52b17c['setHeader']('Access-Control-Allow-Origin',_0x5159b0['headers']['origin']);}_0x52b17c['header']('Access-Control-Allow-Methods','GET,\x20POST,\x20OPTIONS,\x20PUT,\x20PATCH,\x20DELETE');_0x52b17c['header']('Access-Control-Allow-Headers','Origin,\x20X-Requested-With,\x20Content-Type,\x20Accept');_0x52b17c['header']('Access-Control-Allow-Credentials',!![]);_0x397e11();});app['get']('/',flatCacheMiddleware,require('./.build/route/index'));app['get']('/googlePhoto',flatCacheMiddleware,require('./.build/route/googlePhoto'));app['post']('/get',flatCacheMiddleware,require('./.build/route/firebase'));const server=app['listen'](port,function(){if(!process['env']['PORT']){}});exports['app']=functions['https']['onRequest'](app);