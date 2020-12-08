import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';

import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryComponent } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[] = [
    {
      width: '100%',
      height: '250px',
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
  album: IAlbum[] = null;
  result: any = [];
  resultFull: any = [];

  @ViewChildren('ngxGalleryAlbums', { read: NgxGalleryComponent }) ngxGalleryAlbum: QueryList<NgxGalleryComponent>;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dataService: GetDataService,
  ) { }


  ngOnInit(): void {
    this.dataService.getData<IAlbum>({ collection: 'album' }).subscribe(data => {
      this.album = this.dataService.toList<IAlbum>(data);
      this.album.forEach((item, index) => {
        this.resultFull.push({
          album: item,
          galleryImages: this.getGalleryImages(item)
        });
      });
      this.result = this.resultFull;
    });
  }

  ngAfterViewInit() {
    let idRoute = this.activeRoute.snapshot.params['id'];
    if (idRoute) {
      this.viewAlbum(idRoute);
    }
  }

  getGalleryImages(item) {
    let galleryImages = [];
    item.ListImage.forEach((value, index) => {
      value = value.getSizeImage();
      galleryImages.push({
        label: item.title,
        description: item.description,
        small: value,
        medium: value,
        big: value,
      });
    });
    return galleryImages;
  }

  filterAlbum(value: string) {
    this.search = value.trim();
    if (this.search == '') {
      this.result = this.resultFull;
    }
    else {
      this.result = this.resultFull.filter(x => x.album.title.toLowerCase().indexOf(this.search.toLowerCase()) >= 0);
    }
  }

  viewAlbum(id: string) {
    let obj = this.ngxGalleryAlbum.find(x => x["myElement"].nativeElement.id == 'Album_' + id);
    if (obj) {
      obj.openPreview(0);
      this.location.replaceState('/album/' + id);
    }
    else {
      setTimeout(() => {
        this.viewAlbum(id);
      }, 10);
    }
  }

  closePreviewAlbum() {
    this.location.replaceState('/album');
  }
}