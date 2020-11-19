import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './album.component';

import { HttpClientModule } from '@angular/common/http';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 

import { GalleryModule } from '@ngx-gallery/core';
import { LightboxModule } from '@ngx-gallery/lightbox';
@NgModule({
  declarations: [AlbumComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AlbumRoutingModule,
    LazyLoadImageModule,
    GalleryModule,
    LightboxModule
  ]
})
export class AlbumModule { }
