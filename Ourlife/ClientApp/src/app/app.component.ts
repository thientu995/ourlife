import { style } from '@angular/animations';
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
  message = {
    name: "",
    content: ""
  }
  isSendMessage = false;

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

      this.countdown(new Date(data.countdown.value), new Date());
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

  countdown(value: Date, timeSr: Date) {
    // Set the date we're counting down to
    const countDownDate = value.getTime();
    const v_msS = 1000;
    const v_msM = v_msS * 60;
    const v_msH = v_msM * 60;
    const v_msD = v_msH * 24;
    const timeInserval = 1000;
    // Update the count down every 1 second
    this.dataService.post('/api/GetData/Date').subscribe(data => {
      // Get today's date and time
      let dt = new Date(Number(data));
      setInterval(() => {
        // Find the distance between now and the count down date
        dt = new Date(dt.getTime() + timeInserval);
        const distance = countDownDate - dt.getTime();

        let days = 0,
          hours = 0,
          minutes = 0,
          seconds = 0;

        if (distance <= 7) {
          days = 0;
          hours = dt.getHours();
          minutes = dt.getMinutes();
          seconds = dt.getSeconds();
          this.headerCountdown = formatCountDown([hours.pad(2), minutes.pad(2), seconds.pad(2)]);
        } else {
          days = Math.floor(distance / (v_msD));
          hours = Math.floor((distance % (v_msD)) / (v_msH));
          minutes = Math.floor((distance % (v_msH)) / (v_msM));
          seconds = Math.floor((distance % (v_msM)) / v_msS);
          this.headerCountdown = formatCountDown([days.pad(2), hours.pad(2), minutes.pad(2), seconds.pad(2)]);
        }
      }, timeInserval);
    });


    let formatCountDown = function (arrValue) {
      return arrValue.join(" : ");
    }
  }

  keydownTextarea(event) {
    setTimeout(() => {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    });
  }

  sendMessage() {
    if (this.message.content.trim() != '' && this.message.name.trim() != '') {
      let content = `<style>
      table {
         width: 100%;
         border-collapse: collapse;
      }
      th,
      td {
            border: 1px solid black;
         }
   </style>
   <table><thead><tr><th style=""width:30%"">Variable</th><th>Value</th></tr></thead>
   <tbody>`;
      content += `<tr><td>` + 'Name' + `</td><td>` + this.message.name + `</td></tr>`;
      content += `<tr><td>` + 'Content' + `</td><td>` + this.message.content + `</td></tr>`;
      content += `</tbody></table>`;
      this.dataService.setData({
        category: 'message',
        content: content,
      }).subscribe(data => {
        // footerText;
        this.isSendMessage = true;
      });
    }
  }

  resetMessage() {
    this.message = {
      name: "",
      content: ""
    };
  }
}
