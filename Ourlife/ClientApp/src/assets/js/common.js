String.prototype.getUrlImage = function () {
    return this + '=w800-h800-no';
}

Number.prototype.convertSecondsToDateTime = function () {
    return new Date(this * 1e3).toLocaleDateString("en-US");
}

Number.prototype.pad = function (size) {
    let s = String(this);
    while (s.length < (size || 2)) { s = "0" + s; }
    return s;
}

// $.fn.hasScrollBar = function () {
//     return this.get(0).scrollHeight > this.height();
// }