import {
    Component,
    inject,
    Injector,
    output,
    runInInjectionContext
} from '@angular/core';
import { getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
    collection,
    collectionData,
    Firestore,
    query
} from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { environment } from '../../environments/environment';
import { filter } from 'rxjs';

@Component({
    selector: 'app-login',
    imports: [FormsModule, MatIcon],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    private readonly firestore = inject(Firestore);
    private readonly injector = inject(Injector);
    public readonly loggedInOutput = output<boolean>();

    protected username = environment.username;
    protected password = environment.password;
    protected loggedIn = false;

    protected login(): void {
        runInInjectionContext(this.injector, () => {
            signInWithEmailAndPassword(
                getAuth(),
                this.username,
                this.password
            ).then(() => {
                runInInjectionContext(this.injector, () => {
                    const queryRes = query(collection(this.firestore, 'items'));
                    const collData = collectionData(queryRes);
                    collData.pipe(filter((data) => !!data)).subscribe(() => {
                        this.loggedIn = true;
                        this.loggedInOutput.emit(true);
                    });
                });
            });
        });
    }
}
