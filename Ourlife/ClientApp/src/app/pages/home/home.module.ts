import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { HorizontalTimelineComponent } from '../horizontal-timeline/horizontal-timeline.component';
import { PipesModule } from 'src/app/services/pipes.module';

@NgModule({
  declarations: [HomeComponent, HorizontalTimelineComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HomeRoutingModule,
    LazyLoadImageModule,
    PipesModule,
  ],
})
export class HomeModule { }
