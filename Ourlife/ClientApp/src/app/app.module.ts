import { PipesModule } from './services/pipes.module';
import { AudioControlComponent } from './pages/audio-control/audio-control.component';
// import { HomeModule } from './pages/home/home.module';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { PinchZoomModule } from 'ngx-pinch-zoom';

import { HttpClientModule } from '@angular/common/http';
import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import './services/global.service';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';

import { environment } from '../environments/environment';
import { CustomErrorHandler } from './services/error-log.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AudioControlComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    LazyLoadImageModule,
    PinchZoomModule,
    PipesModule,
    ServiceWorkerModule.register('/assets/js/ngsw-worker-custom.js', {
      enabled: environment.production
    })
  ],
  providers: [
    AudioControlComponent,
    // {
    //   provide: ErrorHandler,
    //   useClass: CustomErrorHandler,
    // },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
