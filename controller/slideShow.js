const _0x235f66=function(){let _0x2d0041=!![];return function(_0x57f900,_0x22b52e){const _0x2e3fd1=_0x2d0041?function(){if(_0x22b52e){const _0x1b76f2=_0x22b52e['apply'](_0x57f900,arguments);_0x22b52e=null;return _0x1b76f2;}}:function(){};_0x2d0041=![];return _0x2e3fd1;};}();const _0x572a2d=_0x235f66(this,function(){const _0x21107c=function(){const _0x5aac86=_0x21107c['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x5aac86['test'](_0x572a2d);};return _0x21107c();});_0x572a2d();const _0x596cda=function(){let _0x3fd544=!![];return function(_0x15da57,_0x8a58b9){const _0x1b2d48=_0x3fd544?function(){if(_0x8a58b9){const _0x3c7f47=_0x8a58b9['apply'](_0x15da57,arguments);_0x8a58b9=null;return _0x3c7f47;}}:function(){};_0x3fd544=![];return _0x1b2d48;};}();const _0x2b3e28=_0x596cda(this,function(){const _0x4b574c=function(){};const _0x1b5816=function(){let _0x3a564e;try{_0x3a564e=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x59b971){_0x3a564e=window;}return _0x3a564e;};const _0x213a94=_0x1b5816();if(!_0x213a94['console']){_0x213a94['console']=function(_0x298fb7){const _0x5a4c30={};_0x5a4c30['log']=_0x298fb7;_0x5a4c30['warn']=_0x298fb7;_0x5a4c30['debug']=_0x298fb7;_0x5a4c30['info']=_0x298fb7;_0x5a4c30['error']=_0x298fb7;_0x5a4c30['exception']=_0x298fb7;_0x5a4c30['table']=_0x298fb7;_0x5a4c30['trace']=_0x298fb7;return _0x5a4c30;}(_0x4b574c);}else{_0x213a94['console']['log']=_0x4b574c;_0x213a94['console']['warn']=_0x4b574c;_0x213a94['console']['debug']=_0x4b574c;_0x213a94['console']['info']=_0x4b574c;_0x213a94['console']['error']=_0x4b574c;_0x213a94['console']['exception']=_0x4b574c;_0x213a94['console']['table']=_0x4b574c;_0x213a94['console']['trace']=_0x4b574c;}});_0x2b3e28();app['controller']('slideShowController',['$scope','$timeout',function(_0x226f28,_0x4e2bb1){const _0x19edc6=0xa;_0x226f28['getData']({'collection':'menu'},function(_0x2bd751){_0x226f28['dataArrayMenu']=_0x2bd751['data']['sort']((_0x5ef23f,_0x378f5c)=>{return _0x5ef23f['index']-_0x378f5c['index'];});});_0x226f28['closeFloatyMenu']=function(){_0x4e2bb1(function(){$('.floatyMenuContainer,.button-floaty')['toggleClass']('active');});};_0x226f28['getData']({'collection':'slideshow'},function(_0x4358ff){_0x226f28['dataArray']=_0x4358ff['data'];});_0x226f28['getData']({'collection':'setting','typeMap':'json'},function(_0x331216){new countdown('countdown',_0x331216['data']['countdown']['value']['_seconds']*0x3e8)['start']();_0x226f28['heroBg']={'background-image':'url('+_0x331216['data']['hero']['src']['getUrlImage']()+')'};});_0x226f28['animation']=function(_0x2cdc8a){const _0x50d5e6=_0x226f28['dataArray']['length'];return{'background-image':'url(\x22'+_0x2cdc8a['item']['src']['getUrlImage']()+'\x22)','animation-delay':(_0x2cdc8a['$index']+0x1)*_0x19edc6+'s','animation-duration':(_0x50d5e6+0x1)*_0x19edc6+'s'};};}]);