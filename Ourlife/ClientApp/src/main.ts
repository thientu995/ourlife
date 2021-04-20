import { enableProdMode, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

export function getBaseUrl() {
  return document.getElementsByTagName('base')[0].href;
}

const providers = [
  { provide: 'BASE_URL', useFactory: getBaseUrl, deps: [] },
  { provide: 'MESSAGE', useValue: "Message from client" },
];

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic(providers).bootstrapModule(AppModule).then(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
        if (environment.production) {
          navigator.serviceWorker.register('/ngsw-worker.js', {
            scope: '/'
          }).then(function (registration) {
            console.log('Service Worker registration successful with scope: ', registration.scope);
            registration.unregister().then(function (boolean) { });
          }).catch(function (err) {
            console.log('Service Worker registration failed: ', err)
          });
        }
      });
    }
  }).catch(err => console.error(err));
});