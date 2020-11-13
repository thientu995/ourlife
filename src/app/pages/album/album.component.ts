import { IAlbum } from '../../interfaces/album';
import { GetDataService } from '../../services/get-data.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {
  album: IAlbum[];
  constructor(private dataService: GetDataService) {
    dataService.getData<IAlbum[]>({ collection: 'album' }).subscribe(data => {
      this.album = data;
    });
  }

  ngOnInit(): void {
  }

}
