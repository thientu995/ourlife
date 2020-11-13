import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient,
    private titleService: Title,
    private metaService: Meta) { }

  getData<T>(param) {
    return this.http.post<T>('http://ourlife.t4vn.com/' + 'get', param);
  }

  setTitle(value) {
    this.titleService.setTitle(value);
    this.metaService.addTag({ name: 'title', content: value });
  }

  setMeta(tag: MetaDefinition) {
    this.metaService.addTag(tag);
  }
}
