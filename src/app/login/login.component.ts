import { Component, inject } from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
    collection,
    collectionData,
    Firestore,
    query
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-login',
    imports: [FormsModule, MatIcon],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private readonly firestore = inject(Firestore);

    protected username = '';
    protected password = '';
    protected loggedIn = false;

    protected login(): void {
        signInWithEmailAndPassword(
            getAuth(),
            this.username,
            this.password
        ).then(() => {
            const queryRes = query(collection(this.firestore, 'items'));
            const collData = collectionData(queryRes);
            collData.subscribe((data) => {
                this.loggedIn = true;
                console.log('data', data);
            });
        });
    }
}
