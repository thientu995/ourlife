import { ITagMeta } from './interfaces/tag-meta';
import { GetDataService } from './services/get-data.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ourlife';
  loadSuccess = true;
  readonly menu = [
    { url: '/home', text: 'Trang chủ', icon: 'home' },
    { url: '/album', text: 'Album', icon: '' },
  ];
  constructor(
    private dataService: GetDataService
  ) {
    dataService.getData<ITagMeta>({ collection: 'setting', doc: 'tagMeta' }).subscribe(data => {
      dataService.setTitle(data.title)
      dataService.setMeta({ name: 'description', content: data.description })
    })
  }
}
