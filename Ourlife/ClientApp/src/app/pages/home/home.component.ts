import { ITimeline } from '../../interfaces/timeline';
import { IPortfolio } from '../../interfaces/portfolio';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/album';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  portfolio: IPortfolio[] = null;
  timeline: ITimeline[] = null;
  imageWedding: IAlbum[] = null;

  constructor(private dataService: GetDataService) {
    dataService.getData<IPortfolio>({ collection: 'portfolio' }).subscribe(data => {
      this.portfolio = dataService.toList<IPortfolio>(data).sort((a, b) => {
        return a.order - b.order
      });
    });
    dataService.getData<ITimeline>({ collection: 'timeline' }).subscribe(data => {
      let orginTimeline = dataService.toList<ITimeline>(data).sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      orginTimeline.forEach((value, index) => {
        orginTimeline[index].selected = index == orginTimeline.length - 1;
        orginTimeline[index].img = orginTimeline[index].img.getSizeImage(500, 'timeline');
        orginTimeline[index].date = new Date(value.date);
      });
      this.timeline = orginTimeline;
    });

    this.dataService.getData<IAlbum>({ collection: 'album' }).subscribe(data => {
      this.imageWedding = this.dataService.toList<IAlbum>(data).filter(x => x.isShowHome);
    });
  }

  ngOnInit(): void {
  }

}
