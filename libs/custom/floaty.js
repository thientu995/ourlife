var _0x48a19f=function(){var _0x29be1b=!![];return function(_0x42fa77,_0x54ad67){var _0x447c24=_0x29be1b?function(){if(_0x54ad67){var _0x40f984=_0x54ad67['apply'](_0x42fa77,arguments);_0x54ad67=null;return _0x40f984;}}:function(){};_0x29be1b=![];return _0x447c24;};}();var _0x2bfb3a=_0x48a19f(this,function(){var _0xa90608=function(){var _0x6bdc41=_0xa90608['constructor']('return\x20/\x22\x20+\x20this\x20+\x20\x22/')()['constructor']('^([^\x20]+(\x20+[^\x20]+)+)+[^\x20]}');return!_0x6bdc41['test'](_0x2bfb3a);};return _0xa90608();});_0x2bfb3a();var _0x1a8901=function(){var _0xd2944e=!![];return function(_0x469298,_0x5ec867){var _0x2dc154=_0xd2944e?function(){if(_0x5ec867){var _0x203239=_0x5ec867['apply'](_0x469298,arguments);_0x5ec867=null;return _0x203239;}}:function(){};_0xd2944e=![];return _0x2dc154;};}();var _0x23bdd9=_0x1a8901(this,function(){var _0x28a6a6=function(){};var _0x2b772b=function(){var _0x10f6c2;try{_0x10f6c2=Function('return\x20(function()\x20'+'{}.constructor(\x22return\x20this\x22)(\x20)'+');')();}catch(_0x351781){_0x10f6c2=window;}return _0x10f6c2;};var _0x23ec84=_0x2b772b();if(!_0x23ec84['console']){_0x23ec84['console']=function(_0x3e09c7){var _0x2df96b={};_0x2df96b['log']=_0x3e09c7;_0x2df96b['warn']=_0x3e09c7;_0x2df96b['debug']=_0x3e09c7;_0x2df96b['info']=_0x3e09c7;_0x2df96b['error']=_0x3e09c7;_0x2df96b['exception']=_0x3e09c7;_0x2df96b['table']=_0x3e09c7;_0x2df96b['trace']=_0x3e09c7;return _0x2df96b;}(_0x28a6a6);}else{_0x23ec84['console']['log']=_0x28a6a6;_0x23ec84['console']['warn']=_0x28a6a6;_0x23ec84['console']['debug']=_0x28a6a6;_0x23ec84['console']['info']=_0x28a6a6;_0x23ec84['console']['error']=_0x28a6a6;_0x23ec84['console']['exception']=_0x28a6a6;_0x23ec84['console']['table']=_0x28a6a6;_0x23ec84['console']['trace']=_0x28a6a6;}});_0x23bdd9();class Floaty{constructor(_0x29cceb,_0x5cde2f){var _0x2cff17=_0x2cff17||{};_0x2cff17['addFloaty']=function(_0x5a5467,_0x2d1a76){if(_0x5a5467){var _0x74864c=document['getElementById'](_0x5a5467);_0x74864c['className']+='\x20button-floaty';this['makeFloaty'](_0x74864c,_0x2d1a76);}else{var _0x35e2b0=document['createElement']('div');_0x35e2b0['className']+='\x20button-floaty';document['body']['appendChild'](_0x35e2b0);this['makeFloaty'](_0x35e2b0,_0x2d1a76);}};_0x2cff17['makeFloaty']=function(_0x1766c9,_0x19411b){var _0x59d047=new _0x2cff17['floaty'](_0x1766c9);if(_0x19411b){if(_0x19411b['onTouchStart']){_0x59d047['onTouchStart']=_0x19411b['onTouchStart'];}if(_0x19411b['onTouchEnd']){_0x59d047['onTouchEnd']=_0x19411b['onTouchEnd'];}if(_0x19411b['onTouchMove']){_0x59d047['onTouchMove']=_0x19411b['onTouchMove'];}if(_0x19411b['onMouseOver']){_0x59d047['onMouseOver']=_0x19411b['onMouseOver'];}if(_0x19411b['onMouseDown']){_0x59d047['onMouseDown']=_0x19411b['onMouseDown'];}if(_0x19411b['onMouseUp']){_0x59d047['onMouseUp']=_0x19411b['onMouseUp'];}if(_0x19411b['onMouseMove']){_0x59d047['onMouseMove']=_0x19411b['onMouseMove'];}if(_0x19411b['onActivate']){_0x59d047['onActivate']=_0x19411b['onActivate'];}}_0x59d047['addEventListener']('mouseover',_0x2cff17['makeMouseoverCallback'](_0x59d047));_0x59d047['addEventListener']('mouseleave',_0x2cff17['makeMouseupCallback'](_0x59d047));_0x59d047['addEventListener']('mousedown',_0x2cff17['makeMousedownCallback'](_0x59d047));_0x59d047['addEventListener']('mouseup',_0x2cff17['makeMouseupCallback'](_0x59d047));_0x59d047['addEventListener']('mousemove',_0x2cff17['makeMousemoveCallback'](_0x59d047));_0x59d047['addEventListener']('touchstart',_0x2cff17['makeTouchstartCallback'](_0x59d047),![]);_0x59d047['addEventListener']('touchend',_0x2cff17['makeTouchEndCallback'](_0x59d047),![]);_0x59d047['addEventListener']('touchmove',_0x2cff17['makeTouchmoveCallback'](_0x59d047),![]);_0x59d047['old_x']=_0x1766c9['offsetLeft'];_0x59d047['old_y']=_0x1766c9['offsetTop'];_0x59d047['updatePosition'](_0x1766c9['offsetLeft'],_0x1766c9['offsetTop']);};_0x2cff17['pixelToInt']=function(_0x3bc6f2){var _0x1b0860=_0x3bc6f2['split']('px');var _0x137b65=parseFloat(_0x1b0860[0x0]);return isNaN(_0x137b65)?0x0:_0x137b65;};_0x2cff17['makeMouseoverCallback']=function(_0x51c0ab){return function(){_0x51c0ab['mouse_over']=!![];_0x51c0ab['onMouseOver'](_0x51c0ab);};};_0x2cff17['makeMousedownCallback']=function(_0x13e92c){return function(_0x4d19a4){_0x4d19a4['preventDefault']();_0x13e92c['mouse_clicked']=!![];_0x13e92c['activate']=!![];_0x13e92c['onMouseDown'](_0x13e92c);};};_0x2cff17['makeTouchstartCallback']=function(_0x52baa1){return function(_0x4e5c9e){_0x4e5c9e['preventDefault']();_0x52baa1['mouse_clicked']=!![];_0x52baa1['activate']=!![];_0x52baa1['onTouchStart'](_0x52baa1);};};_0x2cff17['makeMouseupCallback']=function(_0x2e19f3){return function(){if(!_0x2e19f3['mouse_clicked']){return;}_0x2e19f3['mouse_clicked']=![];if(_0x2e19f3['activate']){_0x2e19f3['onActivate'](_0x2e19f3);_0x2e19f3['activate']=![];}else{var _0x38894a=_0x2e19f3['calcMinDirection']();_0x2e19f3['snapback_interval']=setInterval(_0x2e19f3['snapback'],0xa,_0x2e19f3,_0x38894a);var _0x2d3e6b=_0x2e19f3['getClientSize']();var _0x51d368=_0x2d3e6b['width'];var _0x2c1f22=_0x2d3e6b['height'];var _0x472177=_0x2cff17['pixelToInt'](_0x2e19f3['element']['style']['left']);var _0x13c8d0=_0x2cff17['pixelToInt'](_0x2e19f3['element']['style']['top']);if(Math['abs'](_0x2e19f3['old_x']-_0x472177)>_0x51d368/0x2||Math['abs'](_0x2e19f3['old_y']-_0x13c8d0)>_0x2c1f22/0x2){}else{_0x2e19f3['onActivate'](_0x2e19f3);}_0x2e19f3['old_x']=_0x472177;_0x2e19f3['old_y']=_0x13c8d0;}_0x2e19f3['onMouseUp'](_0x2e19f3);};};_0x2cff17['makeTouchEndCallback']=function(_0x1acc5f){return function(){if(!_0x1acc5f['mouse_clicked']){return;}_0x1acc5f['mouse_clicked']=![];if(_0x1acc5f['activate']){_0x1acc5f['onActivate'](_0x1acc5f);_0x1acc5f['activate']=![];}else{var _0x4d4160=_0x1acc5f['calcMinDirection']();_0x1acc5f['snapback_interval']=setInterval(_0x1acc5f['snapback'],0xa,_0x1acc5f,_0x4d4160);var _0x15354e=_0x1acc5f['getClientSize']();var _0x5a4dc0=_0x15354e['width'];var _0x53144d=_0x15354e['height'];var _0x151264=_0x2cff17['pixelToInt'](_0x1acc5f['element']['style']['left']);var _0x187f50=_0x2cff17['pixelToInt'](_0x1acc5f['element']['style']['top']);if(Math['abs'](_0x1acc5f['old_x']-_0x151264)>_0x5a4dc0||Math['abs'](_0x1acc5f['old_y']-_0x187f50)>_0x53144d){}else{_0x1acc5f['onActivate'](_0x1acc5f);}_0x1acc5f['old_x']=_0x151264;_0x1acc5f['old_y']=_0x187f50;}_0x1acc5f['onTouchEnd'](_0x1acc5f);};};_0x2cff17['makeMousemoveCallback']=function(_0x56cbdf){return function(_0x2603ba){_0x2603ba['preventDefault']();if(_0x56cbdf['mouse_clicked']){_0x56cbdf['updatePosition'](_0x2603ba['clientX'],_0x2603ba['clientY']);_0x56cbdf['activate']=![];}_0x56cbdf['onMouseMove'](_0x56cbdf);};};_0x2cff17['makeTouchmoveCallback']=function(_0x56da6f){return function(_0x3337b2){_0x3337b2['preventDefault']();if(_0x56da6f['mouse_clicked']){_0x56da6f['updatePosition'](_0x3337b2['changedTouches'][0x0]['clientX'],_0x3337b2['changedTouches'][0x0]['clientY']);_0x56da6f['activate']=![];}_0x56da6f['onTouchMove'](_0x56da6f);};};_0x2cff17['floaty']=function(_0x139e17){this['element']=_0x139e17;this['mouse_over']=![];this['mouse_click']=![];this['activate']=![];this['snapback_interval']=null;};_0x2cff17['floaty']['prototype']['onActivate']=function(){};_0x2cff17['floaty']['prototype']['onTouchStart']=function(){};_0x2cff17['floaty']['prototype']['onTouchEnd']=function(){};_0x2cff17['floaty']['prototype']['onTouchMove']=function(){};_0x2cff17['floaty']['prototype']['onMouseDown']=function(){};_0x2cff17['floaty']['prototype']['onMouseUp']=function(){};_0x2cff17['floaty']['prototype']['onMouseMove']=function(){};_0x2cff17['floaty']['prototype']['onMouseOver']=function(){};_0x2cff17['floaty']['prototype']['updatePosition']=function(_0x1b7b66,_0x1ab059){var _0x5d46d2=this['getClientSize']();var _0x3d6115=_0x1b7b66-_0x5d46d2['width']/0x2;var _0x1d204a=_0x1ab059-_0x5d46d2['height']/0x2;this['element']['style']['left']=_0x3d6115+'px';this['element']['style']['top']=_0x1d204a+'px';};_0x2cff17['floaty']['prototype']['addEventListener']=function(_0x4fca25,_0x31c78c,_0x73cc76){if(_0x73cc76){this['element']['addEventListener'](_0x4fca25,_0x31c78c,{'passive':!_0x73cc76});}else{this['element']['addEventListener'](_0x4fca25,_0x31c78c);}};_0x2cff17['floaty']['prototype']['removeClass']=function(_0x4828f9){var _0x322f93=new RegExp('(?:^|\x5cs)'+_0x4828f9+'(?!\x5cS)','g');this['element']['className']=this['element']['className']['replace'](_0x322f93,'');};_0x2cff17['floaty']['prototype']['hasClass']=function(_0x57e815){var _0x137818=new RegExp('(?:^|\x5cs)'+_0x57e815+'(?!\x5cS)','g');return this['element']['className']['match'](_0x137818)!=null;};_0x2cff17['floaty']['prototype']['addClass']=function(_0x4c0fcb){this['element']['className']+='\x20'+_0x4c0fcb;};_0x2cff17['floaty']['prototype']['calcMinDirection']=function(){var _0x355361=this['getClientSize']()['height'];var _0x115f33=_0x2cff17['pixelToInt'](this['element']['style']['left']);var _0x1c9259=_0x2cff17['pixelToInt'](this['element']['style']['top']);var _0x544d5c=_0x115f33;var _0x3770fe='left';if(window['innerWidth']-_0x115f33<_0x544d5c){_0x544d5c=window['innerWidth']-_0x115f33;_0x3770fe='right';}if(_0x1c9259<0x32){_0x3770fe='top';}if(window['innerHeight']-_0x1c9259<_0x355361+0x32){_0x3770fe='bottom';}return _0x3770fe;};_0x2cff17['floaty']['prototype']['snapback']=function(_0x5a63d6,_0x9e17a1){function _0x2e96a1(){_0x5a63d6['element']['style']['left']=_0x17213f+'px';_0x5a63d6['element']['style']['top']=_0x34cc82+'px';}function _0x2b4788(){if(_0x17213f<=0x0){_0x17213f=0x0;return!![];}else if(_0x17213f>=Math['abs'](_0xc7e64e-window['innerWidth'])){_0x17213f=Math['abs'](_0xc7e64e-window['innerWidth']);return!![];}return![];}function _0x448706(){if(_0x34cc82<=0x0){_0x34cc82=0x0;return!![];}else if(_0x34cc82>=_0x510664-window['innerHeight']){_0x34cc82=Math['abs'](_0x510664-window['innerHeight']);return!![];}return![];}var _0x17213f=_0x2cff17['pixelToInt'](_0x5a63d6['element']['style']['left']);var _0x34cc82=_0x2cff17['pixelToInt'](_0x5a63d6['element']['style']['top']);var _0x33fc02=_0x5a63d6['getClientSize']();var _0xc7e64e=_0x33fc02['width'];var _0x510664=_0x33fc02['height'];if(_0x17213f<=0.5&&_0x17213f>=-0.5||_0x34cc82<=0.5&&_0x34cc82>=-0.5||_0x34cc82+_0x510664>=window['innerHeight']-0.5&&_0x34cc82+_0x510664<=window['innerHeight']+0.5||_0x17213f+_0xc7e64e>=window['innerWidth']-0.5&&_0x17213f+_0xc7e64e<=window['innerWidth']+0.5||_0x5a63d6['mouse_clicked']){clearInterval(_0x5a63d6['snapback_interval']);}if(_0x9e17a1=='left'||_0x9e17a1=='right'){if(_0x9e17a1=='left'){_0x17213f-=_0x17213f/0xa;}if(_0x9e17a1=='right'){_0x17213f-=(_0x17213f+_0xc7e64e-window['innerWidth'])/0xa;}if(_0x2b4788()){_0x448706();}}else{if(_0x9e17a1=='top'){_0x34cc82-=_0x34cc82/0xa;}if(_0x9e17a1=='bottom'){_0x34cc82-=(_0x34cc82+_0x510664-window['innerHeight'])/0xa;}if(_0x448706()){_0x2b4788();}}_0x2e96a1();};_0x2cff17['floaty']['prototype']['getClientSize']=function(){return{'width':this['element']['clientWidth']+0x14,'height':this['element']['clientHeight']+0x14};};_0x2cff17['makeFloaty'](document['querySelector'](_0x29cceb),_0x5cde2f);}}