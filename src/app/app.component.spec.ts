import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent],
            providers: [
                provideFirestore(() => getFirestore()),
                provideFirebaseApp(() =>
                    initializeApp({
                        projectId: 'kanban-board-104bb',
                        appId: '1:785631141865:web:59669ba197ed5ca598f578',
                        storageBucket: 'kanban-board-104bb.firebasestorage.app',
                        apiKey: 'AIzaSyBP2WCMiBeZY5vjA__OT5Nj_NTiOx0q6lg',
                        authDomain: 'kanban-board-104bb.firebaseapp.com',
                        messagingSenderId: '785631141865'
                    })
                )
            ]
        }).compileComponents();
    });

    it('should render title', () => {
        const fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        expect(compiled.querySelector('span')?.textContent).toContain(
            'Kanban Fire'
        );
    });
});
