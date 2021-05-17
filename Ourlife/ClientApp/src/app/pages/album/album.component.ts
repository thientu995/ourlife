import { ImageLightboxComponent } from './../image-lightbox/image-lightbox.component';
import { IAlbum, IAlbumAudio } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';

import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumComponent implements OnInit {
  readonly arrAnimation = [
    'uk-animation-fade',
    'uk-animation-scale-up',
    'uk-animation-scale-down',
    'uk-animation-slide-top',
    'uk-animation-slide-bottom',
    'uk-animation-slide-left',
    'uk-animation-slide-right',
    'uk-animation-slide-top-small',
    'uk-animation-slide-bottom-small',
    'uk-animation-slide-left-small',
    'uk-animation-slide-right-small',
    'uk-animation-slide-top-medium',
    'uk-animation-slide-bottom-medium',
    'uk-animation-slide-left-medium',
    'uk-animation-slide-right-medium',
    //'uk-animation-kenburns',
    'uk-animation-shake',
    'uk-animation-stroke'
  ];

  search: string = '';
  albumCategory: any = null;
  albumAudio: any = null;
  album: any = null;
  result: any = null;
  selectorAlbumCategory: string = '*';

  @ViewChildren(ImageLightboxComponent) imgLightBox: QueryList<ImageLightboxComponent>;

  constructor(
    private appComponent: AppComponent,
    private location: Location,
    private activeRoute: ActivatedRoute,
    private dataService: GetDataService,
  ) {
    this.search = '';
    this.albumCategory = null;
    this.albumAudio = null;
    this.album = null;
    this.result = null;
    this.selectorAlbumCategory = '*';
  }


  ngOnInit(): void {
    forkJoin([
      this.requestAlbumAudio(),
      this.requestAlbumCategory(),
      this.requestAlbum(1)
    ]).subscribe(result => {
      this.albumAudio = result[0];

      result[1].push({
        id: '*',
        title: 'Tất cả',
        order: 0
      })
      this.albumCategory = result[1].sort((a, b) => {
        return a.order - b.order
      });

      this.result = this.album = result[2].map((item) => (Object.assign({
        album: item,
        audio: this.albumAudio.find(x => x.id == item.albumAudio),
        category: this.albumCategory.find(x => x.id == item.albumCategory),
        galleryImages: this.getGalleryImages(item)
      }))).sort((a, b) => {
        return new Date(b.album.date).getTime() - new Date(a.album.date).getTime();
      });

      this.RoutePage();
    });
  }

  ngAfterViewInit() {
  }

  requestAlbumAudio() {
    return this.dataService.toListAsync<IAlbumAudio>({ collection: 'albumAudio' }, 'albumAudio');
  }

  requestAlbumCategory() {
    return this.dataService.toListAsync<IAlbum>({ collection: 'albumCategory' }, 'albumCategory');
  }

  requestAlbum(page: number) {
    return this.dataService.toListAsync<IAlbum>({ collection: 'album', page: page, limit: 0 }, 'album');
  }

  RoutePage() {
    let idRoute = this.activeRoute.snapshot.params['id'];
    if (idRoute) {
      if (idRoute.toLowerCase() != 'group') {
        let index = this.activeRoute.snapshot.params['index'] || 0;
        this.imgLightBox.changes.subscribe((e) => {
          setTimeout(() => {
            this.viewAlbum(idRoute, index);
          });
        });
      }
      else {
        let value = this.activeRoute.snapshot.params['index'] || '*';
        this.filterAlbumCategory(value);
      }
    }
    else {
      this.appComponent.loadComplete();
    }
  }

  getGalleryImages(item) {
    return item.ListImage.map((value) => (
      Object.assign({
        small: value.getSizeImageMin('album_' + item.id),
        medium: value.getSizeImageMed('album_' + item.id),
        big: value.getSizeImageMax('album_' + item.id),
        src: value,
        srcSet: value.getSrcSet('album_' + item.id),
        srcDownload: String["linkAPI"] + 'GetData/GetRedirectUrl?url=' + encodeURIComponent(value),
        animation: this.getAnimation()
      })
    )
    );
  }

  getAnimation() {
    return this.arrAnimation[Math.floor(Math.random() * this.arrAnimation.length)];
  }

  filterAlbum(value: string) {
    this.search = value.trim();
    this.filterAlbumCategory(this.selectorAlbumCategory);
    if (this.search != '') {
      this.result = this.result.filter(x => x.album.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0);
    }
  }

  filterAlbumCategory(value: string) {
    this.selectorAlbumCategory = value;
    if (value == '*') {
      this.result = this.album;
      this.location.replaceState('/album');
    }
    else {
      this.result = this.album.filter(x => x.album.albumCategory == value);
      if (this.result.length == 0) {
        this.filterAlbumCategory('*');
      }
      else {
        this.location.replaceState('/album/group/' + value);
      }
    }
    window.dispatchEvent(new Event('resize'));
  }

  viewAlbum(id: string, index: number = 0) {
    let obj = this.imgLightBox.find(x => x.id == 'Album_' + id);
    // let obj = this.ngxGalleryAlbum.find(x => x["myElement"].nativeElement.id == 'Album_' + id);
    if (obj) {
      obj.openModal(index);
      // obj.openPreview(index);
      // this.location.replaceState('/album/' + id);
    }
    else {
      this.closePreviewAlbum();
      this.appComponent.loadComplete();
    }
  }

  closePreviewAlbum() {
    this.location.replaceState('/album');
  }
}