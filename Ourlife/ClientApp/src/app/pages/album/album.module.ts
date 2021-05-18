import { PipesModule } from './../../services/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';

import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 
import { FormsModule } from '@angular/forms';
import { ImageLightboxComponent } from './../image-lightbox/image-lightbox.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { VideoPlayerComponent } from '../video-player/video-player.component';

@NgModule({
  declarations: [AlbumComponent, ImageLightboxComponent, VideoPlayerComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AlbumRoutingModule,
    LazyLoadImageModule,
    PipesModule,
    PinchZoomModule,
  ]
})
export class AlbumModule { }
