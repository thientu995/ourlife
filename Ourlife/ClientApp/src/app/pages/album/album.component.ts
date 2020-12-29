import { ImageLightboxComponent } from './../image-lightbox/image-lightbox.component';
import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';

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
  album: any = null;
  result: any = null;
  selectorAlbumCategory: string = '*';

  @ViewChildren(ImageLightboxComponent) imgLightBox: QueryList<ImageLightboxComponent>;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataService: GetDataService,
  ) { }


  ngOnInit(): void {
    this.dataService.getData<IAlbum>({ collection: 'albumCategory' }).subscribe(data => {
      this.albumCategory = this.dataService.toList<IAlbum>(data);
    });

    this.dataService.getData<IAlbum>({ collection: 'album' }).subscribe(data => {
      this.album = this.dataService.toList<IAlbum>(data).map((item) => (Object.assign({
        album: item,
        galleryImages: this.getGalleryImages(item)
      })));
      this.result = this.album;
    });
  }

  ngAfterViewInit() {
    let idRoute = this.activeRoute.snapshot.params['id'];
    if (idRoute) {
      this.imgLightBox.changes.subscribe(() => {
        setTimeout(() => {
          this.viewAlbum(idRoute);
        });
      });
    }
  }

  getGalleryImages(item) {
    return item.ListImage.map((value) => (
      Object.assign({
      label: item.title,
      description: item.description,
      small: value.getSizeImage(250, 'album_' + item.id),
      medium: value.getSizeImage(1024, 'album_' + item.id),
      big: value.getSizeImage(2048, 'album_' + item.id),
      animation: this.getAnimation()
    })
    )
    );
  }

  getAnimation(){
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
    }
    else {
      this.result = this.album.filter(x => x.album.albumCategory == value);
    }
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
    }
  }

  closePreviewAlbum() {
    this.location.replaceState('/album');
  }
}