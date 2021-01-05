import { GetDataService } from './services/get-data.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { ISetting } from './interfaces/setting';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public message = null;

  title = 'ourlife';
  loadSuccess = false;
  public menu = null;

  public footerImg = null;
  public footerText = null;
  public headerHero = '';
  public valueCountdown = null;
  constructor(
    private dataService: GetDataService,
    private router: Router
  ) {
    this.dataService.getData<ISetting>({ collection: 'setting' }).subscribe(data => {
      this.dataService.setTitle(data.tagMeta.title);
      this.dataService.setMeta({ name: 'description', content: data.tagMeta.description });

      this.headerHero = data.hero.src;

      this.footerImg = {
        'background-image': 'url("' + data.footer.src.getSizeImage() + '")'
      }
      this.footerText = data.footer.text;

      this.valueCountdown = new Date(data.countdown.value);
      // this.countdown(new Date(data.countdown.value), new Date());

      this.message = data.footer.form;
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadSuccess = false;
      }
      else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.loadSuccess = true;
        }, 500);
      }
    });
  }
}
