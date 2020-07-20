// Author: Tyler Zeller
const FLOATY_CLASS_NAME = 'floaty';

class Utils {
  static log(message) {
    if (Utils.DEBUG) { console.log(message) }
  }

  static error(message) {
    console.error(`Error: ${message}`)
  }

  static forEach(collection, fn) {
    [].forEach.call(collection, fn)
  }

  static map(collection, fn) {
    return [].map.call(collection, fn)
  }

  static pixelToNum(pixel) {
    let parts = pixel.split('px');
    return parseFloat(parts[0]);
  }

  static pageWidthHeight() {
    return [window.innerWidth, window.innerHeight]
  }

  static pack() {
    let tuple = {}
    Utils.map(arguments, (arg) => { return arg })
    return tuple
  }

  static box(lower, upper) {
    return (x) => { return Math.min(Math.max(x, lower), upper) }
  }
}

Utils.DEBUG = false

class Floaty {
  constructor(element, options) {
    if (!element) {
      Utils.error("Undefined element in BaseFloaty constructor")
      throw "Undefined element in BaseFloaty constructor"
    }

    options = options || {}
    this.element = document.querySelector(element)//element
    this.parent = options.parent || this.getBoundingParent()
    this.headerThreshold = options.headerThreshold || 0.2
    this.xoffset = options.xoffset || Math.round(this.element.clientWidth / 2)
    this.yoffset = options.yoffset || Math.round(this.element.clientHeight / 2)

    if (options.dragLocation) { this.setDragLocation(options.dragLocation) }

    let [pw, ph] = this.getParentWidthHeight()
    Utils.log(`[Constructor]: parent=${this.parent}`)
    Utils.log(`[Constructor]: parent width=${pw}`)
    Utils.log(`[Constructor]: parent height=${ph}`)
    Utils.log(`[Constructor]: element width=${this.element.clientWidth}`)
    Utils.log(`[Constructor]: element height=${this.element.clientHeight}`)
    this.widthBox = Utils.box(0, pw - this.element.clientWidth)
    this.heightBox = Utils.box(0, ph - this.element.clientHeight)

    this.mouseDown = options.mouseDown || (() => { })
    this.mouseOver = options.mouseOver || (() => { })
    this.mouseUp = options.mouseUp || (() => { })
    this.mouseMove = options.mouseMove || (() => { })
    this.mouseLeave = options.mouseLeave || (() => { })
    this.touchStart = options.touchStart || (() => { })
    this.touchEnd = options.touchEnd || (() => { })
    this.touchMove = options.touchMove || (() => { })

    this.snapback = this.snapback.bind(this)
    this.onMouseOver = this.onMouseOver.bind(this)
    this.onMouseDown = this.onMouseDown.bind(this)
    this.onMouseUp = this.onMouseUp.bind(this)
    this.onMouseLeave = this.onMouseLeave.bind(this)
    this.onMouseMove = this.onMouseMove.bind(this)

    this.addEventListener('mouseover', this.onMouseOver)
    this.addEventListener('mouseleave', this.onMouseLeave)
    this.addEventListener('mousedown', this.onMouseDown)
    this.addEventListener('mouseup', this.onMouseUp)
    this.addEventListener('mousemove', this.onMouseMove)

    this.addEventListener('touchstart', this.onTouchStart.bind(this), false)
    this.addEventListener('touchend', this.onTouchEnd.bind(this), false)
    this.addEventListener('touchmove', this.onTouchMove.bind(this), false)
  }

  addEventListener(eventName, fn) {
    if (fn != null) {
      this.element.addEventListener(eventName, fn)
    }
    else {
      this.element.addEventListener(eventName, { passive: true })
    }
  }

  boundingBox(x, y) {
    return [this.widthBox(x), this.heightBox(y)]
  }

  getCoords() {
    return [Utils.pixelToNum(this.element.style.left), Utils.pixelToNum(this.element.style.top)]
  }

  getWidthHeight() {
    return [this.element.clientWidth + 20, this.element.clientHeight + 20]
  }

  // "bounding parent" means parent element with a min(parentWidth, parentHeight) > 0
  // QUESTION: should this be min(parentWidth, parentHeight) > min(this.element.clienthWidth, this.element.clientHeight)?
  getBoundingParent() {
    let pe = this.element.parentElement
    while (Math.min(pe.clientWidth, pe.clientHeight) <= 0) { pe = pe.parentElement }
    return pe
  }

  getParentWidthHeight() {
    return Utils.pageWidthHeight();
    // if (this.parent === window) { return Utils.pageWidthHeight() }
    // return [this.parent.clientWidth, this.parent.clientHeight]
  }

  setXPosition(x) {
    this.element.style.left = x + 'px'
  }

  setYPosition(y) {
    this.element.style.top = y + 'px'
  }

  setPosition(x, y) {
    this.setXPosition(x)
    this.setYPosition(y)
  }

  setDragLocation(dragLocation) {
    for (let part of dragLocation.split(' ')) {
      if (part === 'top') { this.yoffset = 0 }
      if (part === 'left') { this.xoffset = 0 }
      if (part === 'bottom') { this.yoffset = this.element.clientHeight }
      if (part === 'right') { this.xoffset = this.element.clientWidth }
    }
  }

  updatePositionOnDrag(x, y) {
    this.setPosition(...this.boundingBox(x - this.xoffset, y - this.yoffset))
  }

  removeClass(classname) {
    if (this.hasClass(classname)) {
      let re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g')
      this.element.className = this.element.className.replace(re, '')
    }
  }

  hasClass(classname) {
    let re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g')
    return this.element.className.match(re) != null
  }

  addClass(classname) {
    if (!this.hasClass(classname)) { this.element.className += ' ' + classname }
  }

  calcMinDirection() {
    let [w, h] = this.getWidthHeight()
    let [x, y] = this.getCoords()
    let [parentWidth, parentHeight] = this.getParentWidthHeight()
    let headerThreshold = parentHeight * this.headerThreshold
    Utils.log("this.element.clientHeight: " + h)
    Utils.log("this.element.style.top|y: " + y)
    Utils.log("parentHeight: " + parentHeight)

    //let min = x
    let min_dir = 'left'

    if (parentWidth - x < x) {
      //min = parentHeight - x
      min_dir = 'right'
    }

    if (y < headerThreshold) { // y < headerThreshold
      min_dir = 'top'
    }

    if (parentHeight - y < h + headerThreshold) { // height + headerThreshold
      min_dir = 'bottom'
    }

    return min_dir
  }

  snapback(direction) {
    function checkX() {
      if (x <= 0) {
        x = 0;
        return true;
      }
      else if (x >= Math.abs(w - parentWidth)) {
        x = Math.abs(w - parentWidth);
        return true;
      }
      return false;
    }

    function checkY() {
      if (y <= 0) {
        y = 0;
        return true;
      }
      else if (y >= h - parentHeight) {
        y = Math.abs(h - parentHeight);
        return true;
      }
      return false;
    }

    let [x, y] = this.getCoords()
    let [w, h] = this.getWidthHeight()
    let [parentWidth, parentHeight] = this.getParentWidthHeight()


    if (this.mouse_clicked || (x <= 0.5 && x >= -0.5)
      || (y <= 0.5 && y >= -0.5)
      || (y + h >= parentHeight - 0.5 && y + h <= parentHeight + 0.5)
      || (x + w >= parentWidth - 0.5 && x + w <= parentWidth + 0.5)
    ) {
      clearInterval(this.snapback_interval)
    }

    // if (direction == 'left') {
    //   x -= x / 10;
    //   this.setXPosition(x)
    // }

    // if (direction == 'right') {
    //   x -= (x + w - parentWidth) / 10
    //   this.setXPosition(x)
    // }

    // if (direction == 'top') {
    //   y -= y / 10
    //   this.setYPosition(y)
    // }

    // if (direction == 'bottom') {
    //   y -= (y + h - parentHeight) / 10
    //   this.setYPosition(y)
    // }

    if (direction == 'left' || direction == 'right') {
      if (direction == 'left') {
        x -= x / 10;
      }

      if (direction == 'right') {
        x -= (x + w - parentWidth) / 10;
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
        y -= (y + h - parentHeight) / 10;
      }

      if (checkY()) {
        checkX();
      }
    }

    this.setXPosition(x);
    this.setYPosition(y);
  }

  onTouchStart(e) {
    if (this.snapback_interval) {
      clearInterval(this.snapback_interval)
    }
    this.mouse_clicked = true
    this.addClass('floaty-touch')
    this.touchStart(e, this)
  }

  onTouchMove(e) {
    // e.preventDefault()
    if (this.mouse_clicked) { this.updatePositionOnDrag(e.changedTouches[0].clientX, e.changedTouches[0].clientY) }
    this.touchMove(e, this)
  }

  onTouchEnd(e) {
    this.mouse_clicked = false;
    this.removeClass('floaty-touch')
    let direction = this.calcMinDirection()
    this.snapback_interval = setInterval(this.snapback, 10, direction)
    this.touchEnd(e, this)
  }

  onMouseOver(e) {
    this.mouse_over = true;
    this.removeClass('floaty-left')
    this.addClass('floaty-over')
    this.mouseOver(e, this)
  }

  onMouseLeave(e) {
    this.mouse_over = false
    this.removeClass('floaty-over')
    this.addClass('floaty-left')
    this.mouseLeave(e, this)
  }

  onMouseDown(e) {
    if (this.snapback_interval) {
      clearInterval(this.snapback_interval)
    }
    this.mouse_clicked = true;
    this.removeClass('floaty-up')
    this.addClass('floaty-down')
    this.mouseDown(e, this)
  }

  onMouseMove(e) {
    e.preventDefault()
    if (this.mouse_clicked) { this.updatePositionOnDrag(e.clientX, e.clientY) }
    this.mouseMove(e, this)
  }

  onMouseUp(e) {
    this.mouse_clicked = false
    this.removeClass('floaty-down')
    this.addClass('floaty-up')
    let direction = this.calcMinDirection()
    this.snapback_interval = setInterval(this.snapback, 10, direction)
    this.mouseUp(e, this)
  }

  static init() {
    let floatyElms = document.getElementsByClassName(`${FLOATY_CLASS_NAME}`)
    let callConstructor = (elm) => { return new Floaty(elm) }
    return Utils.map(floatyElms, callConstructor)
  }

  static addFloaty(id, options) {
    if (!id) {
      Utils.error("arg 'id' in 'floaty.addFloaty' must be non-falsey")
      throw "arg 'id' in 'floaty.addFloaty' must be non-falsey"
    }

    options = options || {}

    let parent = options.parent || document.body

    let elem = document.getElementById(id);
    if (!elem) {
      elem = document.createElement('div')
      elem.id = id
      elem.className += ' floaty'
      parent.appendChild(elem);
    } else {
      elem.className += ' floaty'
    }

    return new Floaty(elem, options)
  }
}

// class Floaty {
//   constructor(element, option) {
//     var floaty = floaty || {};

//     floaty.addFloaty = function (id, options) {
//       if (id) {
//         var target = document.getElementById(id);
//         target.className += ' button-floaty';
//         this.makeFloaty(target, options);
//       } else {
//         var elemDiv = document.createElement('div');
//         elemDiv.className += ' button-floaty';
//         document.body.appendChild(elemDiv);
//         this.makeFloaty(elemDiv, options);
//       }
//     };

//     floaty.makeFloaty = function (element, options) {
//       var floater = new floaty.floaty(element);

//       if (options) {
//         if (options.onTouchStart) {
//           floater.onTouchStart = options.onTouchStart;
//         }
//         if (options.onTouchEnd) {
//           floater.onTouchEnd = options.onTouchEnd;
//         }
//         if (options.onTouchMove) {
//           floater.onTouchMove = options.onTouchMove;
//         }
//         if (options.onMouseOver) {
//           floater.onMouseOver = options.onMouseOver;
//         }
//         if (options.onMouseDown) {
//           floater.onMouseDown = options.onMouseDown;
//         }
//         if (options.onMouseUp) {
//           floater.onMouseUp = options.onMouseUp;
//         }
//         if (options.onMouseMove) {
//           floater.onMouseMove = options.onMouseMove;
//         }
//         if (options.onActivate) {
//           floater.onActivate = options.onActivate;
//         }
//       }

//       // floater.element.style.top = (Math.floor((Math.random() * 10) + 1) * 50) + 'px';
//       // var r = Math.floor((Math.random() * 255) + 1);
//       // var g = Math.floor((Math.random() * 255) + 1);
//       // var b = Math.floor((Math.random() * 255) + 1);
//       // floater.element.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';

//       // if (!Modernizr.touch) {
//       floater.addEventListener('mouseover', floaty.makeMouseoverCallback(floater)); // END floater.addEventListener
//       // floater.addEventListener('mouseleave', floaty.makeMouseupCallback(floater))
//       floater.addEventListener('mousedown', floaty.makeMousedownCallback(floater)); // END floater.addEventListener
//       floater.addEventListener('mouseup', floaty.makeMouseupCallback(floater)); // END floater.addEventListener
//       floater.addEventListener('mousemove', floaty.makeMousemoveCallback(floater)); // END floater.addEventListener
//       // }
//       // else {
//       floater.addEventListener('touchstart', floaty.makeTouchstartCallback(floater), false); // END floater.addEventListener
//       floater.addEventListener('touchend', floaty.makeTouchEndCallback(floater), false); // END floater.addEventListener
//       floater.addEventListener('touchmove', floaty.makeTouchmoveCallback(floater), false); // END floater.addEventListener
//       // }


//       floater.old_x = (element.offsetLeft);
//       floater.old_y = (element.offsetTop);
//       floater.updatePosition(element.offsetLeft, element.offsetTop);
//       // window.addEventListener('resize', function () {
//       //   floater.updatePosition(0, 0);
//       // });
//     };

//     floaty.pixelToInt = function (measurement) {
//       var strings = measurement.split('px');
//       var px = parseFloat(strings[0]);
//       return isNaN(px) ? 0 : px;
//     };

//     floaty.makeMouseoverCallback = function (floater) {
//       return function () {
//         floater.mouse_over = true;
//         floater.onMouseOver(floater);
//       };
//     };

//     floaty.makeMousedownCallback = function (floater) {
//       return function (event) {
//         event.preventDefault();
//         floater.mouse_clicked = true;
//         floater.activate = true;
//         // floater.addClass('active');
//         floater.onMouseDown(floater);
//       };
//     };

//     floaty.makeTouchstartCallback = function (floater) {
//       return function (event) {
//         // event.preventDefault();
//         floater.mouse_clicked = true;
//         floater.activate = true;
//         // floater.addClass('active');
//         floater.onTouchStart(floater);
//       };
//     };

//     floaty.makeMouseupCallback = function (floater) {
//       return function (event) {
//         if (!floater.mouse_clicked) {
//           return;
//         }
//         event.preventDefault();
//         floater.mouse_clicked = false;
//         // floater.removeClass('active');
//         if (floater.activate) {
//           floater.onActivate(floater);
//           floater.activate = false;
//         } else {
//           var direction = floater.calcMinDirection();
//           floater.snapback_interval = setInterval(floater.snapback, 10, floater, direction);

//           var size = floater.getClientSize();
//           var width = size.width;
//           var height = size.height;

//           var new_x = floaty.pixelToInt(floater.element.style.left);
//           var new_y = floaty.pixelToInt(floater.element.style.top);
//           if (Math.abs(floater.old_x - new_x) > width / 2
//             || Math.abs(floater.old_y - new_y) > height / 2
//           ) {
//           }
//           else {
//             floater.onActivate(floater);
//           }
//           floater.old_x = new_x;
//           floater.old_y = new_y;
//         }
//         floater.onMouseUp(floater);
//       };
//     };

//     floaty.makeTouchEndCallback = function (floater) {
//       return function () {
//         if (!floater.mouse_clicked) {
//           return;
//         }
//         floater.mouse_clicked = false;
//         // floater.removeClass('active');
//         if (floater.activate) {
//           floater.onActivate(floater);
//           floater.activate = false;
//         } else {
//           var direction = floater.calcMinDirection();
//           floater.snapback_interval = setInterval(floater.snapback, 10, floater, direction);

//           var size = floater.getClientSize();
//           var width = size.width;
//           var height = size.height;

//           var new_x = floaty.pixelToInt(floater.element.style.left);
//           var new_y = floaty.pixelToInt(floater.element.style.top);
//           if (Math.abs(floater.old_x - new_x) > width
//             || Math.abs(floater.old_y - new_y) > height
//           ) {
//           }
//           else {
//             floater.onActivate(floater);
//           }
//           floater.old_x = new_x;
//           floater.old_y = new_y;
//         }
//         floater.onTouchEnd(floater);
//       };
//     };

//     floaty.makeMousemoveCallback = function (floater) {
//       return function (e) {
//         e.preventDefault();
//         if (floater.mouse_clicked) {
//           floater.updatePosition(e.clientX, e.clientY);
//           floater.activate = false;
//         }
//         floater.onMouseMove(floater);
//       };
//     };

//     floaty.makeTouchmoveCallback = function (floater) {
//       return function (e) {
//         // e.preventDefault();
//         if (floater.mouse_clicked) {
//           floater.updatePosition(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
//           floater.activate = false;
//         }
//         floater.onTouchMove(floater);
//       };
//     };

//     floaty.floaty = function (dom_object) {
//       this.element = dom_object;
//       this.mouse_over = false;
//       this.mouse_click = false;
//       this.activate = false;
//       this.snapback_interval = null;
//     };

//     floaty.floaty.prototype.onActivate = function () { };

//     floaty.floaty.prototype.onTouchStart = function () { };
//     floaty.floaty.prototype.onTouchEnd = function () { };
//     floaty.floaty.prototype.onTouchMove = function () { };

//     floaty.floaty.prototype.onMouseDown = function () { };
//     floaty.floaty.prototype.onMouseUp = function () { };
//     floaty.floaty.prototype.onMouseMove = function () { };
//     floaty.floaty.prototype.onMouseOver = function () { };

//     floaty.floaty.prototype.updatePosition = function (mouseX, mouseY) {
//       var size = this.getClientSize();
//       var new_x = mouseX - (size.width / 2);
//       var new_y = mouseY - (size.height / 2);

//       this.element.style.left = new_x + 'px';
//       this.element.style.top = new_y + 'px';
//     };

//     floaty.floaty.prototype.addEventListener = function (eventName, callback, fn) {
//       if (fn != null) {
//         this.element.addEventListener(eventName, callback, { passive: !fn });
//       }
//       else {
//         this.element.addEventListener(eventName, callback);
//       }
//     };

//     floaty.floaty.prototype.removeClass = function (classname) {
//       var re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g');
//       this.element.className = this.element.className.replace(re, '');
//     };

//     floaty.floaty.prototype.hasClass = function (classname) {
//       var re = new RegExp('(?:^|\\s)' + classname + '(?!\\S)', 'g');
//       return this.element.className.match(re) != null;
//     };

//     floaty.floaty.prototype.addClass = function (classname) {
//       this.element.className += ' ' + classname;
//     };

//     floaty.floaty.prototype.calcMinDirection = function () {
//       var height = this.getClientSize().height;

//       var x = floaty.pixelToInt(this.element.style.left);
//       var y = floaty.pixelToInt(this.element.style.top);

//       var min = x;
//       var min_dir = 'left';

//       if (window.innerWidth - x < min) {
//         min = window.innerWidth - x;
//         min_dir = 'right';
//       }

//       if (y < 50) {
//         min_dir = 'top';
//       }

//       if (window.innerHeight - y < height + 50) {
//         min_dir = 'bottom';
//       }

//       return min_dir;
//     }

//     floaty.floaty.prototype.snapback = function (floater, direction) {
//       function setPos() {
//         floater.element.style.left = x + 'px';
//         floater.element.style.top = y + 'px';
//       }

//       function checkX() {
//         if (x <= 0) {
//           x = 0;
//           return true;
//         }
//         else if (x >= Math.abs(width - window.innerWidth)) {
//           x = Math.abs(width - window.innerWidth);
//           return true;
//         }
//         return false;
//       }

//       function checkY() {
//         if (y <= 0) {
//           y = 0;
//           return true;
//         }
//         else if (y >= height - window.innerHeight) {
//           y = Math.abs(height - window.innerHeight);
//           return true;
//         }
//         return false;
//       }

//       var x = floaty.pixelToInt(floater.element.style.left);
//       var y = floaty.pixelToInt(floater.element.style.top);

//       var size = floater.getClientSize();
//       var width = size.width;
//       var height = size.height;

//       if ((x <= 0.5 && x >= -0.5)
//         || (y <= 0.5 && y >= -0.5)
//         || (y + height >= window.innerHeight - 0.5 && y + height <= window.innerHeight + 0.5)
//         || (x + width >= window.innerWidth - 0.5 && x + width <= window.innerWidth + 0.5)
//         || floater.mouse_clicked) {
//         clearInterval(floater.snapback_interval);
//       }

//       if (direction == 'left' || direction == 'right') {
//         if (direction == 'left') {
//           x -= x / 10;
//         }

//         if (direction == 'right') {
//           x -= (x + width - window.innerWidth) / 10;
//         }

//         if (checkX()) {
//           checkY();
//         }
//       }
//       else {
//         if (direction == 'top') {
//           y -= y / 10;
//         }

//         if (direction == 'bottom') {
//           y -= (y + height - window.innerHeight) / 10;
//         }

//         if (checkY()) {
//           checkX();
//         }
//       }





//       setPos();
//     }

//     floaty.floaty.prototype.getClientSize = function () {
//       return {
//         width: this.element.clientWidth + 20,
//         height: this.element.clientHeight + 20
//       }
//     }
//     floaty.makeFloaty(document.querySelector(element), option);
//   }
// }