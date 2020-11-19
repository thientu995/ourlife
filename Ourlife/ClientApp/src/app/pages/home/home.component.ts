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
    dataService.getData<IPortfolio>({ collection: 'portfolio' }).subscribe(data => {
      this.portfolio = dataService.toList<IPortfolio>(data).sort((a, b) => {
        return a.order - b.order
      });
    });
    dataService.getData<ITimeline>({ collection: 'timeline' }).subscribe(data => {
      let orginTimeline = dataService.toList<ITimeline>(data);
      orginTimeline.forEach((value, index) => {
        orginTimeline[index].selected = index == 0;
        orginTimeline[index].date = new Date(value.date);
      });
      
      
      this.timeline = orginTimeline.sort((a, b) => {
        return b.date.getTime() - a.date.getTime();
      });
    });
  }

  ngOnInit(): void {
  }

}
