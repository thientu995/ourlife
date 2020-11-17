export {}
declare global {
  interface String {
    getUrlImage(): string;
  }

  interface Number {
    convertSecondsToDateTime(): string;
    pad(size): string;
  }
}

String.prototype.getUrlImage = function () {
  console.log(this)
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