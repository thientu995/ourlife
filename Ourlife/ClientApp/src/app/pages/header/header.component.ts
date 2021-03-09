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
  currentDate = '';
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
        this.countdown(this.appComponent.valueCountdown, new Date());
      });
      return;
    }
    // Set the date we're counting down to
    const countDownDate = value.getTime();
    // Update the count down every 1 second
    this.dataService.post('/api/GetData/Date').subscribe(data => {
      // Get today's date and time
      let dt = new Date(Number(data));
      this.currentDate = [dt.getDate().pad(2), (dt.getMonth() + 1).pad(2), dt.getFullYear().pad(4)].join('/');

      let worker = new Worker('./header.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(data)
        this.headerCountdown = data;
      };
      worker.postMessage({
        countDownDate: countDownDate,
        dt: dt,
      });
    });
  }
}
