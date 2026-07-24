import {
    ApplicationConfig,
    provideBrowserGlobalErrorListeners,
    isDevMode
} from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';
import { appRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        provideBrowserGlobalErrorListeners(),
        provideRouter(appRoutes),
        provideFirebaseApp(() =>
            initializeApp({
                projectId: 'kanban-board-104bb',
                appId: '1:785631141865:web:59669ba197ed5ca598f578',
                storageBucket: 'kanban-board-104bb.firebasestorage.app',
                apiKey: 'AIzaSyBP2WCMiBeZY5vjA__OT5Nj_NTiOx0q6lg',
                authDomain: 'kanban-board-104bb.firebaseapp.com',
                messagingSenderId: '785631141865'
            })
        ),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
        })
    ]
};
