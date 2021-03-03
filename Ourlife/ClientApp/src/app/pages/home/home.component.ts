import { ITimeline } from '../../interfaces/timeline';
import { IPortfolio } from '../../interfaces/portfolio';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IAlbum } from 'src/app/interfaces/album';
const fjGallery = import('flickr-justified-gallery');

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
  weatherData: any = [];
  happyWedding: any = null;
  arrDay = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  constructor(private dataService: GetDataService) {
    this.portfolio = null;
    this.timeline = null;
    this.imageWedding = null;
    this.happyWedding = [
      {
        title: 'Lễ Vu Quy',
        address: '<b>Tư Gia</b> (Tân Quới)',
        date: new Date(2021, 4, 1, 9, 0),
        lunar: '(Ngày 20 tháng 03 năm Tân Sửu)',
      },
      {
        title: 'Lễ Tân Hôn',
        address: '<b>Tuan Cong Palace</b> (Chợ Mới)',
        date: new Date(2021, 4, 2, 10, 0),
        lunar: '(Ngày 21 tháng 03 năm Tân Sửu)',
      },
    ];
  }

  ngOnInit(): void {
    this.dataService.toListAsync<IPortfolio>({ collection: 'portfolio' }, 'portfolio').then(data => {
      this.portfolio = data.sort((a, b) => {
        return b.order - a.order
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
      this.imageWedding.forEach((value, index) => {
        let temp = value.ListImage.slice();
        let lstImg = [];
        value.ListImage.slice(0, 12).forEach((value, index) => {
          let indexImg = this.randomIndexImageAlbum(temp);
          let obj = temp[indexImg];
          temp = temp.filter(x => x != obj);
          lstImg.push({
            index: indexImg,
            obj: indexImg + '::' + obj
          });
        });
        value.ListImage = lstImg.sort((a, b) => { return a.index - b.index }).map(x => x.obj);
      });
      setTimeout(() => {
        fjGallery.then(obj => {
          obj.default(document.querySelectorAll('.fj-gallery'), {
            itemSelector: '.fj-gallery-item',
            rowHeight: 350,
          });
        });
      }, 500);
    });

    // this.dataService.post<any>('/api/GetData/Weather').subscribe(data => {
    //   this.getDataWeather(data.server.weather);
    //   this.getDataWeather(data.client.weather);
    // });

  }

  private getDataWeather(data) {
    if (data != null && data.length > 0) {
      data = data[0];
      this.weatherData.push(data);
    }
    return null;
  }

  private setValueImageTimeLime(data) {
    if (data.selected == null) {
      data.selected = false;
      data.img = data.img.getSizeImage(500, 'timeline');
      data.date = new Date(data.date);
    }
  }

  private randomIndexImageAlbum(ListImage) {
    return Math.floor(Math.random() * (ListImage.length + 1));
  }
}
