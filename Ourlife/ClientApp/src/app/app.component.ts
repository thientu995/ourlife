import { ITagMeta } from './interfaces/tag-meta';
import { GetDataService } from './services/get-data.service';
import { Component } from '@angular/core';
import { IFooter } from './interfaces/footer';

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
    { url: '/album', text: 'Album', icon: 'photo' },
  ];

  footerImg = null;
  footerText = null;
  headerSlideshow = null;
  constructor(
    private dataService: GetDataService
  ) {
    // dataService.getData<ITagMeta>({ collection: 'setting', doc: 'tagMeta' }).subscribe(data => {
    //   dataService.setTitle(data.title)
    //   dataService.setMeta({ name: 'description', content: data.description })
    // });

    // dataService.getData<IFooter>({ collection: 'setting', doc: 'footer' }).subscribe(data => {
    //   this.footerImg = {
    //     'background-image': 'url("' + data.src.getUrlImage() + '")'
    //   }
    //   this.footerText = data.text
    // });

    // dataService.getData<IFooter>({ collection: 'slideshow' }).subscribe(data => {
    //   this.headerSlideshow = data;
    // });

    dataService.getData({ collection: 'setting', typeMap: 'json' }).subscribe(data => {
      console.log(data);
      // new countdown('countdown', value.data.countdown.value._seconds * 1e3).start();
      // $scope.heroBg = {
      //     'background-image': 'url(' + value.data.hero.src.getUrlImage() + ')'
      // }
    });
  }
}
