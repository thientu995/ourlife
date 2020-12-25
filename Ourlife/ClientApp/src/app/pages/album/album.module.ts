import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';

import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { FormsModule } from '@angular/forms';
import { ImageLightboxComponent } from '../image-lightbox/image-lightbox.component';

@NgModule({
  declarations: [AlbumComponent, ImageLightboxComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    AlbumRoutingModule,
    LazyLoadImageModule,
    NgxGalleryModule,
  ]
})
export class AlbumModule { }
