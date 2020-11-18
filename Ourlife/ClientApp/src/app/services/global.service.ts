export { }
declare global {
  interface String {
    getSizeImage(width?: number, height?: number): string;
  }

  interface Number {
    convertSecondsToDateTime(): string;
    pad(size): string;
  }

  interface Array<T>{
    arrayObj(): any[];
  }
}

String.prototype.getSizeImage = function (width: number = 800, height: number = 800) {
  if (this && this != '') {
    return this + '=w' + width + '-h' + height + '-no';
  }
  return 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
}

Number.prototype.convertSecondsToDateTime = function () {
  return new Date(this * 1e3).toLocaleDateString("en-US");
}

Number.prototype.pad = function (size) {
  let s = String(this);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}

Array.prototype.arrayObj<T> = function(){

}