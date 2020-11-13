import { ITimeline } from '../../interfaces/timeline';
import { IPortfolio } from '../../interfaces/portfolio';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  portfolio: IPortfolio[] = null;
  timeline: ITimeline[] = null;

  constructor(private dataService: GetDataService) {
    dataService.getData<IPortfolio[]>({ collection: 'portfolio' }).subscribe(data => {
      this.portfolio = data.sort((a, b) => {
        return a.order - b.order
      });
    });
    dataService.getData<ITimeline[]>({ collection: 'timeline' }).subscribe(data => {
      this.timeline = data.sort((a, b) => {
        return a.date._seconds - b.date._seconds
      });
    });
  }

  ngOnInit(): void {
  }

}
