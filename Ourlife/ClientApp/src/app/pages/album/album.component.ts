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
  album: IAlbum[] = null;
  constructor(
    private dataService: GetDataService,
  ) {
    dataService.getData<IAlbum>({ collection: 'album' }).subscribe(data => {
      this.album = dataService.toList<IAlbum>(data);
    });
  }

  ngOnInit(): void {

  }

  getGalleryOptions(item) {
    return [
      {
        width: '100%',
        height: '200px',
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
        imageSwipe: true,
        imageDescription: true,
        imagePercent: 100,
        imageAutoPlay: false,
        imageAutoPlayInterval: 5000,

        thumbnailsSwipe: true,
        thumbnailsRemainingCount: true,
        thumbnailsColumns: 5,
        thumbnailsPercent: 100,

        previewCloseOnClick: true,
        previewCloseOnEsc: true,
        previewInfinityMove: true,
        previewSwipe: true,
        previewZoom: true,
        previewRotate: true,
        previewDownload: true,
        previewBullets: true,
        // previewAutoPlay: true,
        // previewAutoPlayPauseOnHover: true,
        // previewAutoPlayInterval: 5000
      },
    ];
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
}