import { ITimeline } from '../../interfaces/timeline';
import { IPortfolio } from '../../interfaces/portfolio';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  portfolio: IPortfolio[] = null;
  timeline: ITimeline[] = null;

  constructor(private dataService: GetDataService) {
    dataService.getData<IPortfolio[]>({ collection: 'portfolio' }).subscribe(data => {
      var items = Object.keys(data).map<IPortfolio>(function(key) {
        return data[key];
      });
      this.portfolio = items.sort((a, b) => {
        return a.order - b.order
      });
    });
    dataService.getData<ITimeline[]>({ collection: 'timeline' }).subscribe(data => {
      var items = Object.keys(data).map<ITimeline>(function(key) {
        return data[key];
      });
      this.timeline = items.sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    });
  }

  ngOnInit(): void {
  }

}
