import { GetDataService } from './services/get-data.service';
import { Component } from '@angular/core';
import { ISetting } from './interfaces/setting';
import { Router, NavigationStart, NavigationEnd, NavigationError, NavigationCancel, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ourlife';
  loadSuccess = false;
  menu = null;

  footerImg = null;
  footerText = null;
  headerHero = '';
  headerCountdown = '';
  constructor(
    private dataService: GetDataService,
    private router: Router
  ) {
    this.dataService.get('/json/menu.json').subscribe(data => {
      this.menu = data;
    });

    this.dataService.getData<ISetting>({ collection: 'setting', typeMap: 'json' }).subscribe(data => {
      this.dataService.setTitle(data.tagMeta.title);
      this.dataService.setMeta({ name: 'description', content: data.tagMeta.description });

      this.headerHero = data.hero.src;

      this.footerImg = {
        'background-image': 'url("' + data.footer.src.getSizeImage() + '")'
      }
      this.footerText = data.footer.text;

      this.countdown(new Date(data.countdown.value));
    });

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadSuccess = false;
      }
      else if (event instanceof NavigationEnd){
        setTimeout(() => {
          this.loadSuccess = true;
        }, 500);
      }
    });

  }

  getSizeImage(src, width: null) {
    return src.getSizeImage(width);
  }

  countdown(value: Date) {
    // Set the date we're counting down to
    var countDownDate = value.getTime();

    // Update the count down every 1 second
    var x = setInterval(() => {

      // Get today's date and time
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      var distance = countDownDate - now;
      var days = "00 : ",
        hours = "00 : ",
        minutes = "00 : ",
        seconds = "00";

      if (distance < 0) {
        days = '';
        hours = new Date(now).getHours().pad(2) + " : ";
        minutes = new Date(now).getMinutes().pad(2) + " : ";
        seconds = new Date(now).getSeconds().pad(2);
      } else {
        days = Math.floor(distance / (1000 * 60 * 60 * 24)).pad(2) + " : ";
        hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).pad(2) + " : ";
        minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).pad(2) + " : ";
        seconds = Math.floor((distance % (1000 * 60)) / 1000).pad(2);
      }
      this.headerCountdown = days + hours + minutes + seconds;
    }, 1000);
  }
}
