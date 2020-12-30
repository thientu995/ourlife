import { AppComponent } from './../app.component';
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
  // readonly likApi = 'http://localhost:52256/api/';
  readonly likApi = '/api/';

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
    const headers: HttpHeaders = new HttpHeaders();
    headers.set('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.post<T>(this.likApi + 'GetData/FirebaseDB',
      null,
      {
        params: param,
        headers: headers
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
}
