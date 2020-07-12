class Floaty {
  constructor(element, option) {
    var floaty = floaty || {};

    floaty.addFloaty = function (id, options) {
      if (id) {
        var target = document.getElementById(id);
        target.className += ' button-floaty';
        this.makeFloaty(target, options);
      } else {
        var elemDiv = document.createElement('div');
        elemDiv.className += ' button-floaty';
        document.body.appendChild(elemDiv);
        this.makeFloaty(elemDiv, options);
      }
    };

    floaty.makeFloaty = function (element, options) {
      var floater = new floaty.floaty(element);

      if (options) {
        if (options.onTouchStart) {
          floater.onTouchStart = options.onTouchStart;
        }
        if (options.onTouchEnd) {
          floater.onTouchEnd = options.onTouchEnd;
        }
        if (options.onTouchMove) {
          floater.onTouchMove = options.onTouchMove;
        }
        if (options.onMouseOver) {
          floater.onMouseOver = options.onMouseOver;
        }
        if (options.onMouseDown) {
          floater.onMouseDown = options.onMouseDown;
        }
        if (options.onMouseUp) {
          floater.onMouseUp = options.onMouseUp;
        }
        if (options.onMouseMove) {
          floater.onMouseMove = options.onMouseMove;
        }
        if (options.onActivate) {
          floater.onActivate = options.onActivate;
        }
      }

      // floater.element.style.top = (Math.floor((Math.random() * 10) + 1) * 50) + 'px';
      // var r = Math.floor((Math.random() * 255) + 1);
      // var g = Math.floor((Math.random() * 255) + 1);
      // var b = Math.floor((Math.random() * 255) + 1);
      // floater.element.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';

      // if (!Modernizr.touch) {
      floater.addEventListener('mouseover', floaty.makeMouseoverCallback(floater)); // END floater.addEventListener
      floater.addEventListener('mouseleave', floaty.makeMouseupCallback(floater))
      floater.addEventListener('mousedown', floaty.makeMousedownCallback(floater)); // END floater.addEventListener
      floater.addEventListener('mouseup', floaty.makeMouseupCallback(floater)); // END floater.addEventListener
      floater.addEventListener('mousemove', floaty.makeMousemoveCallback(floater)); // END floater.addEventListener
      // }
      // else {
      floater.addEventListener('touchstart', floaty.makeTouchstartCallback(floater), false); // END floater.addEventListener
      floater.addEventListener('touchend', floaty.makeTouchEndCallback(floater), false); // END floater.addEventListener
      floater.addEventListener('touchmove', floaty.makeTouchmoveCallback(floater), false); // END floater.addEventListener
      // }


      floater.old_x = (element.offsetLeft);
      floater.old_y = (element.offsetTop);
      floater.updatePosition(element.offsetLeft, element.offsetTop);
      // window.addEventListener('resize', function () {
      //   floater.updatePosition(0, 0);
      // });
    };

    floaty.pixelToInt = function (measurement) {
      var strings = measurement.split('px');
      var px = parseFloat(strings[0]);
      return isNaN(px) ? 0 : px;
    };

    floaty.makeMouseoverCallback = function (floater) {
      return function () {
        floater.mouse_over = true;
        floater.onMouseOver(floater);
      };
    };

    floaty.makeMousedownCallback = function (floater) {
      return function (event) {
        event.preventDefault();
        floater.mouse_clicked = true;
        floater.activate = true;
        // floater.addClass('active');
        floater.onMouseDown(floater);
      };
    };

    floaty.makeTouchstartCallback = function (floater) {
      return function (event) {
        event.preventDefault();
        floater.mouse_clicked = true;
        floater.activate = true;
        // floater.addClass('active');
        floater.onTouchStart(floater);
      };
    };

    floaty.makeMouseupCallback = function (floater) {
      return function () {
        if (!floater.mouse_clicked) {
          return;
        }
        floater.mouse_clicked = false;
        // floater.removeClass('active');
        if (floater.activate) {
          floater.onActivate(floater);
          floater.activate = false;
        } else {
          var direction = floater.calcMinDirection();
          floater.snapback_interval = setInterval(floater.snapback, 10, floater, direction);

          var size = floater.getClientSize();
          var width = size.width;
          var height = size.height;

          var new_x = floaty.pixelToInt(floater.element.style.left);
          var new_y = floaty.pixelToInt(floater.element.style.top);
          if (Math.abs(floater.old_x - new_x) > width / 2
            || Math.abs(floater.old_y - new_y) > height / 2
          ) {
          }
          else {
            floater.onActivate(floater);
          }
          floater.old_x = new_x;
          floater.old_y = new_y;
        }
        floater.onMouseUp(floater);
      };
    };

    floaty.makeTouchEndCallback = function (floater) {
      return function () {
        if (!floater.mouse_clicked) {
          return;
        }
        floater.mouse_clicked = false;
        // floater.removeClass('active');
        if (floater.activate) {
          floater.onActivate(floater);
          floater.activate = false;
        } else {
          var direction = floater.calcMinDirection();
          floater.snapback_interval = setInterval(floater.snapback, 10, floater, direction);

          var size = floater.getClientSize();
          var width = size.width;
          var height = size.height;

          var new_x = floaty.pixelToInt(floater.element.style.left);
          var new_y = floaty.pixelToInt(floater.element.style.top);
          if (Math.abs(floater.old_x - new_x) > width
            || Math.abs(floater.old_y - new_y) > height
          ) {
          }
          else {
            floater.onActivate(floater);
          }
          floater.old_x = new_x;
          floater.old_y = new_y;
        }
        floater.onTouchEnd(floater);
      };
    };

    floaty.makeMousemoveCallback = function (floater) {
      return function (e) {
        e.preventDefault();
        if (floater.mouse_clicked) {
          floater.updatePosition(e.clientX, e.clientY);
          floater.activate = false;
        }
        floater.onMouseMove(floater);
      };
    };

    floaty.makeTouchmoveCallback = function (floater) {
      return function (e) {
        e.preventDefault();
        if (floater.mouse_clicked) {
          floater.updatePosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
          floater.activate = false;
        }
        floater.onTouchMove(floater);
      };
    };

    floaty.floaty = function (dom_object) {
      this.element = dom_object;
      this.mouse_over = false;
      this.mouse_click = false;
      this.activate = false;
      this.snapback_interval = null;
    };

    floaty.floaty.prototype.onActivate = function () { };

    floaty.floaty.prototype.onTouchStart = function () { };
    floaty.floaty.prototype.onTouchEnd = function () { };
    floaty.floaty.prototype.onTouchMove = function () { };

    floaty.floaty.prototype.onMouseDown = function () { };
    floaty.floaty.prototype.onMouseUp = function () { };
    floaty.floaty.prototype.onMouseMove = function () { };
    floaty.floaty.prototype.onMouseOver = function () { };

    floaty.floaty.prototype.updatePosition = function (mouseX, mouseY) {
      var size = this.getClientSize();
      var new_x = mouseX - (size.width / 2);
      var new_y = mouseY - (size.height / 2);

      this.element.style.left = new_x + 'px';
      this.element.style.top = new_y + 'px';
    };

    floaty.floaty.prototype.addEventListener = function (eventName, callback, fn) {
      if (fn) {
        this.element.addEventListener(eventName, callback, { passive: !fn });
      }
      else {
        this.element.addEventListener(eventName, callback);
      }
    };

    floaty.floaty.prototype.removeClass = function (classname) {
      var re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g');
      this.element.className = this.element.className.replace(re, '');
    };

    floaty.floaty.prototype.hasClass = function (classname) {
      var re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g');
      return this.element.className.match(re) != null;
    };

    floaty.floaty.prototype.addClass = function (classname) {
      this.element.className += ' ' + classname;
    };

    floaty.floaty.prototype.calcMinDirection = function () {
      var height = this.getClientSize().height;

      var x = floaty.pixelToInt(this.element.style.left);
      var y = floaty.pixelToInt(this.element.style.top);

      var min = x;
      var min_dir = 'left';

      if (window.innerWidth - x < min) {
        min = window.innerWidth - x;
        min_dir = 'right';
      }

      if (y < 50) {
        min_dir = 'top';
      }

      if (window.innerHeight - y < height + 50) {
        min_dir = 'bottom';
      }

      return min_dir;
    }

    floaty.floaty.prototype.snapback = function (floater, direction) {
      function setPos() {
        floater.element.style.left = x + 'px';
        floater.element.style.top = y + 'px';
      }

      function checkX() {
        if (x <= 0) {
          x = 0;
          return true;
        }
        else if (x >= Math.abs(width - window.innerWidth)) {
          x = Math.abs(width - window.innerWidth);
          return true;
        }
        return false;
      }

      function checkY() {
        if (y <= 0) {
          y = 0;
          return true;
        }
        else if (y >= height - window.innerHeight) {
          y = Math.abs(height - window.innerHeight);
          return true;
        }
        return false;
      }

      var x = floaty.pixelToInt(floater.element.style.left);
      var y = floaty.pixelToInt(floater.element.style.top);

      var size = floater.getClientSize();
      var width = size.width;
      var height = size.height;

      if ((x <= 0.5 && x >= -0.5)
        || (y <= 0.5 && y >= -0.5)
        || (y + height >= window.innerHeight - 0.5 && y + height <= window.innerHeight + 0.5)
        || (x + width >= window.innerWidth - 0.5 && x + width <= window.innerWidth + 0.5)
        || floater.mouse_clicked) {
        clearInterval(floater.snapback_interval);
      }

      if (direction == 'left' || direction == 'right') {
        if (direction == 'left') {
          x -= x / 10;
        }

        if (direction == 'right') {
          x -= (x + width - window.innerWidth) / 10;
        }

        if (checkX()) {
          checkY();
        }
      }
      else {
        if (direction == 'top') {
          y -= y / 10;
        }

        if (direction == 'bottom') {
          y -= (y + height - window.innerHeight) / 10;
        }

        if (checkY()) {
          checkX();
        }
      }





      setPos();
    }

    floaty.floaty.prototype.getClientSize = function () {
      return {
        width: this.element.clientWidth + 20,
        height: this.element.clientHeight + 20
      }
    }
    floaty.makeFloaty(document.querySelector(element), option);
  }
}