const _0x34c2f7=function(){let _0xa79281=!![];return function(_0x151f05,_0x4e53d1){const _0x2af831=_0xa79281?function(){if(_0x4e53d1){const _0x11a4e4=_0x4e53d1['apply'](_0x151f05,arguments);_0x4e53d1=null;return _0x11a4e4;}}:function(){};_0xa79281=![];return _0x2af831;};}();const _0x6911da=_0x34c2f7(this,function(){const _0x13410b=function(){const _0x53d385=_0x13410b['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x53d385['test'](_0x6911da);};return _0x13410b();});_0x6911da();const _0x103041=function(){let _0x52db60=!![];return function(_0x341f90,_0x51f5f1){const _0x23b90c=_0x52db60?function(){if(_0x51f5f1){const _0x5f62ad=_0x51f5f1['apply'](_0x341f90,arguments);_0x51f5f1=null;return _0x5f62ad;}}:function(){};_0x52db60=![];return _0x23b90c;};}();const _0x9b12a8=_0x103041(this,function(){const _0x9108c7=function(){};let _0x19f47d;try{const _0x2f4ea4=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');');_0x19f47d=_0x2f4ea4();}catch(_0x5a215b){_0x19f47d=window;}if(!_0x19f47d['console']){_0x19f47d['console']=function(_0x6a13c0){const _0x30757b={};_0x30757b['log']=_0x6a13c0;_0x30757b['warn']=_0x6a13c0;_0x30757b['debug']=_0x6a13c0;_0x30757b['info']=_0x6a13c0;_0x30757b['error']=_0x6a13c0;_0x30757b['exception']=_0x6a13c0;_0x30757b['table']=_0x6a13c0;_0x30757b['trace']=_0x6a13c0;return _0x30757b;}(_0x9108c7);}else{_0x19f47d['console']['log']=_0x9108c7;_0x19f47d['console']['warn']=_0x9108c7;_0x19f47d['console']['debug']=_0x9108c7;_0x19f47d['console']['info']=_0x9108c7;_0x19f47d['console']['error']=_0x9108c7;_0x19f47d['console']['exception']=_0x9108c7;_0x19f47d['console']['table']=_0x9108c7;_0x19f47d['console']['trace']=_0x9108c7;}});_0x9b12a8();const request=require('request');const admin=require('firebase-admin');const db=admin['firestore']()['collection']('googlePhoto');module['exports']=function(_0x4fa060,_0x22fd9c){const _0x3da3a9=_0x4fa060['query']['idAlbum'];const _0x215648='https://photos.app.goo.gl/'+_0x3da3a9;let _0x3278d8=[];db['doc'](_0x3da3a9)['get']()['then'](_0x571a57=>{if(!_0x571a57['exists']){request['get'](_0x215648,(_0x2ac3e9,_0x42259c,_0x1a4ccd)=>{_0x3278d8=getImageInAlbum(_0x1a4ccd);db['doc'](_0x3da3a9)['set']({'createDate':new Date(),'order':0x0,'value':_0x3278d8});_0x22fd9c['send'](_0x3278d8);});}else{_0x22fd9c['send'](_0x571a57['data']()['value']);}});};function getImageInAlbum(_0x51062b){const _0x41860f=/\["(https:\/\/lh3\.googleusercontent\.com\/[a-zA-Z0-9\-_]*)"/g;const _0x3f4a5e=new Set();let _0xff011c;while(_0xff011c=_0x41860f['exec'](_0x51062b)){_0x3f4a5e['add'](_0xff011c[0x1]);}return Array['from'](_0x3f4a5e);}