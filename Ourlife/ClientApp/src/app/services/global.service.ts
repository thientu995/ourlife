export { }
declare global {
  interface String {
    getSizeImage(width?: number, group?: string): string;
  }

  interface Number {
    convertSecondsToDateTime(): string;
    pad(size): string;
  }

  // interface Array<T> {
  //   toObj(): Array<T>;
  // }

  // interface Object {
  //   toList<T>(): T[];
  // }
  function ConvertList<T>(): T[];
}

String.prototype.getSizeImage = function (width: number = 2048, group: string = '_nogroup') {
  if (this && this != '') {
    let url = this.replace('https://', '').replace('http://', '') + '=s' + width + '-no';
    return '/api/GetData/Image?group=' + group + '&id=' + encodeURIComponent(url);
  }
  return '/img/loading.gif';
}

Number.prototype.convertSecondsToDateTime = function () {
  return new Date(this * 1e3).toLocaleDateString("en-US");
}

Number.prototype.pad = function (size) {
  let s = String(this);
  while (s.length < (size || 2)) { s = "0" + s; }
  return s;
}

// declare function ConvertList<T>(data: any) {
//   if (this) {
//     return Object.keys(this).map((key) => {
//       return this[key];
//     });
//   }
//   return data
// }