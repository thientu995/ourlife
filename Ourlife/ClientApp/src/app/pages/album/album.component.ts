import { ImageLightboxComponent } from './../image-lightbox/image-lightbox.component';
import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList, ViewEncapsulation } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlbumComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '0px',
      height: '0px',
      lazyLoading: true,
      fullWidth: true,
      imageAnimation: NgxGalleryAnimation.Rotate,

      arrowPrevIcon: 'mi mi-chevron-left',
      arrowNextIcon: 'mi mi-chevron-right',
      closeIcon: 'mi mi-close',
      fullscreenIcon: 'mi mi-fullscreen',
      spinnerIcon: 'mi mi-refesh',
      zoomInIcon: 'mi mi-zoom-in',
      zoomOutIcon: 'mi mi-zoom-out',
      rotateLeftIcon: 'mi mi-rotate-left',
      rotateRightIcon: 'mi mi-rotate-right',
      downloadIcon: 'mi mi-save',

      image: false,
      // imageSwipe: true,
      imageDescription: true,
      imagePercent: 100,
      imageAutoPlay: false,
      // imageAutoPlayInterval: 5000,

      thumbnails: false,
      // thumbnailsSwipe: true,
      thumbnailsRemainingCount: false,
      thumbnailsColumns: 5,
      thumbnailsPercent: 100,

      preview: true,
      previewCloseOnClick: false,
      previewCloseOnEsc: true,
      previewInfinityMove: true,
      previewSwipe: true,
      previewZoom: true,
      previewRotate: true,
      previewDownload: false,
      previewBullets: true,
      // previewArrowsAutoHide: true,
      previewAutoPlay: false,
      // previewAutoPlayPauseOnHover: true,
      // previewAutoPlayInterval: 5000
    },
    {
      breakpoint: 500,
      thumbnailsColumns: 2,
    },
  ];

  search: string = '';
  albumCategory: any = null;
  album: any = null;
  result: any = null;
  selectorAlbumCategory: string = '*';

  @ViewChildren('ngxGalleryAlbums', { read: NgxGalleryComponent }) ngxGalleryAlbum: QueryList<NgxGalleryComponent>;
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
    return item.ListImage.map((value) => (Object.assign({
      label: item.title,
      description: item.description,
      small: value.getSizeImage(250, 'album_' + item.id),
      medium: value.getSizeImage(1024, 'album_' + item.id),
      big: value.getSizeImage(2048, 'album_' + item.id),
    }))
    );
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