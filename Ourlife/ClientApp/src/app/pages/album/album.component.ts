import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from '@ngx-gallery/core';
import { Lightbox } from '@ngx-gallery/lightbox';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: IAlbum[] = null;
  items: GalleryItem[];
  const imageData = [
    {
      src: 'https://preview.ibb.co/jrsA6R/img12.jpg',
      thumb: 'https://preview.ibb.co/jrsA6R/img12.jpg'
    },
    {
      src: 'https://preview.ibb.co/kPE1D6/clouds.jpg',
      thumb: 'https://preview.ibb.co/kPE1D6/clouds.jpg'
    },
    {
      src: 'https://preview.ibb.co/mwsA6R/img7.jpg',
      thumb: 'https://preview.ibb.co/mwsA6R/img7.jpg'
    },
    {
      src: 'https://preview.ibb.co/kZGsLm/img8.jpg',
      thumb: 'https://preview.ibb.co/kZGsLm/img8.jpg'
    }
  ];

  constructor(
    private dataService: GetDataService, 
    public gallery: Gallery, 
    public lightbox: Lightbox
    ) {
    dataService.getData<IAlbum>({ collection: 'album' }).subscribe(data => {
      this.album = dataService.toList<IAlbum>(data);
      console.log(this.album[0].ListImage)
    });
  }

  ngOnInit(): void {
    this.items = imageData.map(item => {
      return new ImageItem(item);
    });

    // This is for Lightbox example
    this.gallery.ref('lightbox').load(this.items);
  }

}
