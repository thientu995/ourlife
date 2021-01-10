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
    this.portfolio = null;
    this.timeline = null;
    this.imageWedding = null;
  }

  ngOnInit(): void {
    this.dataService.toListAsync<IPortfolio>({ collection: 'portfolio' }, 'portfolio').then(data => {
      this.portfolio = data.sort((a, b) => {
        return a.order - b.order
      });
    });
    this.dataService.toListAsync<ITimeline>({ collection: 'timeline' }, 'timeline').then(data => {
      this.timeline = data.sort((a, b) => {
        this.setValueImageTimeLime(a);
        this.setValueImageTimeLime(b);
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
      this.timeline[0].selected = true;
    });

    this.dataService.toListAsync<IAlbum>({ collection: 'album' }, 'album').then(data => {
      this.imageWedding = data.filter(x => x.isShowHome);
    });
  }

  private setValueImageTimeLime(data){
    if (data.selected == null) {
      data.selected = false;
      data.img = data.img.getSizeImage(500, 'timeline');
      data.date = new Date(data.date);
    }
  }
}
