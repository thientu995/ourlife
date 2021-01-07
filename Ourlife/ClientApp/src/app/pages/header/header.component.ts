import { AppComponent } from './../../app.component';
import { Component, AfterViewInit } from '@angular/core';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  menu = null;
  headerCountdown = '';
  constructor(private dataService: GetDataService, public appComponent: AppComponent) { }

  ngAfterViewInit(): void {
    this.dataService.get('/json/menu.json').subscribe(data => {
      this.menu = data;
      this.countdown(this.appComponent.valueCountdown, new Date());
    });
  }

  countdown(value: Date, timeSr: Date) {
    if (value == null) {
      setTimeout(() => {
        this.countdown(value, timeSr);
      });
      return
    }
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
      let currentDate = [dt.getFullYear().pad(4), (dt.getMonth() + 1).pad(2), dt.getDay().pad(2)].join('/') + '<br>';
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
          this.headerCountdown = currentDate + formatCountDown([hours.pad(2), minutes.pad(2), seconds.pad(2)]);
        } else {
          days = Math.floor(distance / (v_msD));
          hours = Math.floor((distance % (v_msD)) / (v_msH));
          minutes = Math.floor((distance % (v_msH)) / (v_msM));
          seconds = Math.floor((distance % (v_msM)) / v_msS);
          this.headerCountdown = currentDate + formatCountDown([days.pad(2), hours.pad(2), minutes.pad(2), seconds.pad(2)]);
        }
      }, timeInserval);
    });


    let formatCountDown = function (arrValue) {
      return arrValue.join(" : ");
    }
  }
}
