import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LoginComponent],
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

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
