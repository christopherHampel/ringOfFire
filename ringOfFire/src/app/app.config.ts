import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"ring-of-fire-fc798","appId":"1:234478436977:web:54e2e869b5fa3a73f251d0","storageBucket":"ring-of-fire-fc798.appspot.com","apiKey":"AIzaSyD5lQGE9FlwDmIvVa7TP4ErMnxW5zHUNYQ","authDomain":"ring-of-fire-fc798.firebaseapp.com","messagingSenderId":"234478436977"})), provideFirestore(() => getFirestore())]
};
