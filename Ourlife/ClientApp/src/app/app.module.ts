import { AudioControlComponent } from './pages/audio-control/audio-control.component';
// import { HomeModule } from './pages/home/home.module';
import { LazyLoadImageModule } from 'ng-lazyload-image'; 
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import './services/global.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AudioControlComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LazyLoadImageModule,
    PinchZoomModule,
  ],
  providers: [AudioControlComponent],
  bootstrap: [AppComponent]
})
export class AppModule { 
  
}
