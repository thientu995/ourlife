import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppCustomPreloader } from './app-routing.loading';

const routes: Routes = [
  {
    path: 'home',
    // component: HomeComponent,
    loadChildren: () => import('./pages/home/home.module').then(mod => mod.HomeModule),
    data: { preload: true }
  },
  {
    path: 'album',
    // component: AlbumComponent,
    loadChildren: () => import('./pages/album/album.module').then(mod => mod.AlbumModule),
    data: { preload: true }
  },
  {
    path: 'album/:id',
    // component: AlbumComponent,
    loadChildren: () => import('./pages/album/album.module').then(mod => mod.AlbumModule),
    data: { preload: true }
  },
  {
    path: 'album/:id/:index',
    // component: AlbumComponent,
    loadChildren: () => import('./pages/album/album.module').then(mod => mod.AlbumModule),
    data: { preload: true }
  },
  {
    path: 'album/group/:id',
    // component: AlbumComponent,
    loadChildren: () => import('./pages/album/album.module').then(mod => mod.AlbumModule),
    data: { preload: true }
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // useHash: true,
    initialNavigation: 'enabled',
    preloadingStrategy: AppCustomPreloader 
  })],
  exports: [RouterModule],
  providers: [AppCustomPreloader]
})
export class AppRoutingModule { }
