const _0x46c312=function(){let _0x265924=!![];return function(_0x4146b8,_0xacbe74){const _0x1765a6=_0x265924?function(){if(_0xacbe74){const _0x2ac009=_0xacbe74['apply'](_0x4146b8,arguments);_0xacbe74=null;return _0x2ac009;}}:function(){};_0x265924=![];return _0x1765a6;};}();const _0x49d6ff=_0x46c312(this,function(){const _0x3980de=function(){const _0x307a37=_0x3980de['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x307a37['test'](_0x49d6ff);};return _0x3980de();});_0x49d6ff();const _0x251662=function(){let _0x192d35=!![];return function(_0x4b03fc,_0x37439d){const _0x2f6b12=_0x192d35?function(){if(_0x37439d){const _0x85bf74=_0x37439d['apply'](_0x4b03fc,arguments);_0x37439d=null;return _0x85bf74;}}:function(){};_0x192d35=![];return _0x2f6b12;};}();const _0x5d3ed5=_0x251662(this,function(){const _0xb062f=function(){};const _0x106bc3=function(){let _0x2930d9;try{_0x2930d9=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x3fa7ba){_0x2930d9=window;}return _0x2930d9;};const _0x9ddc3=_0x106bc3();if(!_0x9ddc3['console']){_0x9ddc3['console']=function(_0x33702f){const _0x2154b6={};_0x2154b6['log']=_0x33702f;_0x2154b6['warn']=_0x33702f;_0x2154b6['debug']=_0x33702f;_0x2154b6['info']=_0x33702f;_0x2154b6['error']=_0x33702f;_0x2154b6['exception']=_0x33702f;_0x2154b6['table']=_0x33702f;_0x2154b6['trace']=_0x33702f;return _0x2154b6;}(_0xb062f);}else{_0x9ddc3['console']['log']=_0xb062f;_0x9ddc3['console']['warn']=_0xb062f;_0x9ddc3['console']['debug']=_0xb062f;_0x9ddc3['console']['info']=_0xb062f;_0x9ddc3['console']['error']=_0xb062f;_0x9ddc3['console']['exception']=_0xb062f;_0x9ddc3['console']['table']=_0xb062f;_0x9ddc3['console']['trace']=_0xb062f;}});_0x5d3ed5();const admin=require('firebase-admin');const db=admin['firestore']();module['exports']=function(_0x5a670f,_0x31b66c){const _0x271924=_0x5a670f['body']['collection'];const _0xbf6208=_0x5a670f['body']['doc'];const _0x2168ff=(_0x5a670f['body']['typeMap']||'')['toLowerCase']();const _0x2c0b23=db['collection'](_0x271924);if(_0xbf6208){_0x2c0b23['doc'](_0xbf6208)['get']()['then'](_0x246170=>{_0x31b66c['send'](_0x246170['data']());});}else{_0x2c0b23['get']()['then'](_0x52ba7d=>{const _0x8cc979=_0x52ba7d['docs'];data={};switch(_0x2168ff){case'orign':data=_0x8cc979;break;case'json':_0x8cc979['map'](_0x1d0c70=>{return data[_0x1d0c70['id']]=_0x1d0c70['data']();});break;default:data=_0x8cc979['map'](_0x4c10c4=>_0x4c10c4['data']());break;}_0x31b66c['send'](data);});}};