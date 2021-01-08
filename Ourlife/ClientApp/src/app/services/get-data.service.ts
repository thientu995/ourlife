import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(
    private http: HttpClient,
    private titleService: Title,
    private metaService: Meta,
  ) { }
  readonly likApi = String["linkAPI"];
  // readonly likApi = '/api/';

  get(url) {
    return this.http.get(url);
  }

  post(url) {
    return this.http.post(url, null);
  }

  head(url) {
    return this.http.head(url);
  }

  getData<T>(param) {
    return this.http.post<T>(this.likApi + 'GetData/FirebaseDB',
      null,
      {
        params: param,
        headers: this.getHeader(),
        withCredentials: true
      }
    );
  }

  setData<T>(param) {
    return this.http.post<T>(this.likApi + 'SaveData/Index',
      null,
      {
        params: param,
        headers: this.getHeader(),
        withCredentials: true
      });
  }

  setTitle(value) {
    this.titleService.setTitle(value);
    this.metaService.addTag({ name: 'title', content: value });
  }

  setMeta(tag: MetaDefinition) {
    this.metaService.addTag(tag);
  }

  toList<T>(data: T) {
    return Object.keys(data).map<T>((key) => (Object.assign({ id: key }, data[key])));
  }

  private getHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'X-XSRF-TOKEN': this.getCookie('XSRF-TOKEN')
    });
  }

  private getCookie(name: string) {
    if (typeof document === 'undefined' || document === null) {
      return '';
    }
      let ca: Array<string> = document.cookie.split(';');
      let caLen: number = ca.length;
      let cookieName = `${name}=`;
      let c: string;

      for (let i: number = 0; i < caLen; i += 1) {
        c = ca[i].replace(/^\s+/g, '');
        if (c.indexOf(cookieName) == 0) {
          return c.substring(cookieName.length, c.length);
        }
      }
    return '';
  }

  // private deleteCookie(name) {
  //   this.setCookie(name, '', -1);
  // }

  // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
  //   let d: Date = new Date();
  //   d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  //   let expires: string = `expires=${d.toUTCString()}`;
  //   let cpath: string = path ? `; path=${path}` : '';
  //   window.document.cookie = `${name}=${value}; ${expires}${cpath}`;
  // }

}
