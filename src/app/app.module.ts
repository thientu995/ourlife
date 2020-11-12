import { AlbumModule } from './album/album.module';
import { HomeModule } from './home/home.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LazyImageModule } from 'ng-lazy-image';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    LazyImageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
