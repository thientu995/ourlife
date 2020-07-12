!function (window) {
    var $q = function (q, res) {
        if (document.querySelectorAll) {
            res = document.querySelectorAll(q);
        } else {
            var d = document
                , a = d.styleSheets[0] || d.createStyleSheet();
            a.addRule(q, 'f:b');
            for (var l = d.all, b = 0, c = [], f = l.length; b < f; b++)
                l[b].currentStyle.f && c.push(l[b]);

            a.removeRule(0);
            res = c;
        }
        return res;
    };

    var addEventListener = function (evt, fn) {
        if (window.addEventListener) {
            this.addEventListener(evt, fn, false);
            window.simpleBarBody.getScrollElement().addEventListener(evt, fn, false);
        }
        else if (window.attachEvent) {
            this.attachEvent('on' + evt, fn);
            window.simpleBarBody.getScrollElement().attachEvent('on' + evt, fn);
        } else {
            this['on' + evt] = fn;
            window.simpleBarBody.getScrollElement()['on' + evt] = fn;
        }
    };

    var _has = function (obj, key) {
        return Object.prototype.hasOwnProperty.call(obj, key);
    };

    function loadImage(el, fn) {
        var img = new Image()
            , src = el.getAttribute('data-lazy-src');
        img.onload = function () {
            if (!!el.parent)
                el.parent.replaceChild(img, el)
            else
                el.src = src;

            fn ? fn() : null;
        }
        img.src = src;
    }

    function elementInViewport(el) {
        var rect = el.getBoundingClientRect()

        return (
            rect.top >= 0
            && rect.left >= 0
            && rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        )
    }

    processScroll = function () {
        let images = $q('img[data-lazy-src]:not([src])');
        for (var i = 0; i < images.length; i++) {
            if (elementInViewport(images[i])) {
                loadImage(images[i], function () {
                    // images.splice(i, i);
                });
            }
        };
    };

    processScroll();
    addEventListener('scroll', processScroll);
    addEventListener('resize', processScroll);

}(this);