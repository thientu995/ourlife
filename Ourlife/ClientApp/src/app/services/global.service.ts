export { }
declare global {
  interface String {
    getSizeImage(width?: number, group?: string): string;
    getSrcSet(): string;
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

String.prototype.getSrcSet = function (group: string = '_nogroup') {
  let getSrc = (width: number) => {
    return this.getSizeImage(width, group) + ' ' + width + 'w';
  }
  if (this && this != '') {
    return [
      getSrc(640),
      getSrc(800),
      getSrc(1024),
      getSrc(1280),
      getSrc(1366),
      getSrc(1440),
      getSrc(1536),
      getSrc(1680),
      getSrc(1920),
      getSrc(2048),
      getSrc(2560),
      getSrc(3440),
      getSrc(3840),
    ].join(',');
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