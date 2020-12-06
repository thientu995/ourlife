import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  search: string = '';
  album: IAlbum[] = null;
  result: any = [];
  resultFull: any = [];
  constructor(
    private dataService: GetDataService,
  ) {
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


  ngOnInit(): void {
    this.galleryOptions = [
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
      }
    ];
  }

  getGalleryImages(item) {
    let galleryImages = [];
    item.ListImage.forEach((value, index) => {
      value = value.getSizeImage();
      galleryImages.push({
        // label: item.title,
        // description: item.description,
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
}