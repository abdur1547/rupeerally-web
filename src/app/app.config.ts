import { provideRouter } from '@angular/router';

import { provideServiceWorker } from '@angular/service-worker';
import { ApplicationConfig, isDevMode, ErrorHandler } from '@angular/core';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  authInterceptor,
  httpErrorInterceptor,
  GlobalErrorHandlingService,
} from './core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: ErrorHandler, useClass: GlobalErrorHandlingService },
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideHttpClient(
      withInterceptors([authInterceptor, httpErrorInterceptor])
    ),
  ],
};
