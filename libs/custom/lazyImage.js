
angular.module('lazyLoadingImageBetter', []).run(
    function ($rootScope) {
        // $rootScope.photos = new Array(100);
    }
);

angular.module('lazyLoadingImageBetter').service(
    'scrollAndResizeListener', function ($window, $document, $timeout) {
        var id = 0,
            listeners = {},
            scrollTimeoutId,
            resizeTimeoutId;

        function addEvent(element) {
            element.addEventListener('scroll', function () {
                // cancel previous timeout (simulates stop event)
                $timeout.cancel(scrollTimeoutId);

                // wait for 200ms and then invoke listeners (simulates stop event)
                scrollTimeoutId = $timeout(invokeListeners, 200);
            });


            element.addEventListener('resize', function () {
                $timeout.cancel(resizeTimeoutId);
                resizeTimeoutId = $timeout(invokeListeners, 200);
            });
        }

        function invokeListeners() {
            var clientHeight = $document[0].documentElement.clientHeight,
                clientWidth = $document[0].documentElement.clientWidth;

            for (var key in listeners) {
                if (listeners.hasOwnProperty(key)) {
                    listeners[key](clientHeight, clientWidth); // call listener with given arguments
                }
            }
        }


        addEvent($window);
        addEvent($window.simpleBarBody.getScrollElement());


        return {
            bindListener: function (listener) {
                var index = ++id;

                listeners[id] = listener;

                return function () {
                    delete listeners[index];
                }
            }
        };
    }
);

angular.module('lazyLoadingImageBetter').directive(
    'imageLazySrc', function ($document, scrollAndResizeListener) {
        return {
            restrict: 'A',
            link: function ($scope, $element, $attributes) {
                var listenerRemover;

                function isInView(clientHeight, clientWidth) {
                    // get element position
                    var imageRect = $element[0].getBoundingClientRect();

                    if (
                        (imageRect.top >= 0 && imageRect.bottom <= clientHeight)
                        &&
                        (imageRect.left >= 0 && imageRect.right <= clientWidth)
                    ) {
                        $element[0].src = $attributes.imageLazySrc; // set src attribute on element (it will load image)

                        // unbind event listeners when image src has been set
                        listenerRemover();
                    }
                }

                // bind listener
                listenerRemover = scrollAndResizeListener.bindListener(isInView);

                // unbind event listeners if element was destroyed
                // it happens when you change view, etc
                $element.on('$destroy', function () {
                    listenerRemover();
                });


                // explicitly call scroll listener (because, some images are in viewport already and we haven't scrolled yet)
                isInView(
                    $document[0].documentElement.clientHeight,
                    $document[0].documentElement.clientWidth
                );
            }
        };
    }
);
