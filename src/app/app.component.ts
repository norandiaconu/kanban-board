import {
    Component,
    inject,
    Injector,
    runInInjectionContext
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskComponent } from './task/task.component';
import { MatCardModule } from '@angular/material/card';
import {
    CdkDragDrop,
    DragDropModule,
    transferArrayItem
} from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import {
    TaskDialogComponent,
    TaskDialogResult
} from './task-dialog/task-dialog.component';
import { LoginComponent } from './login/login.component';
import {
    addDoc,
    collection,
    collectionData,
    deleteDoc,
    doc,
    Firestore,
    query,
    updateDoc,
    where
} from '@angular/fire/firestore';
import { Observable, take } from 'rxjs';

@Component({
    imports: [
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        TaskComponent,
        MatCardModule,
        DragDropModule,
        MatButtonModule,
        LoginComponent
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private readonly dialog = inject(MatDialog);
    private readonly firestore = inject(Firestore);
    private readonly injector = inject(Injector);

    protected title = 'kanban-board';
    protected todo: Task[] = [
        {
            title: 'Buy milk',
            description: 'Go to the store and buy milk'
        },
        {
            title: 'Create a Kanban app',
            description: 'Using Firebase and Angular create a Kanban app!'
        }
    ];
    protected todoObs: Observable<Task[]> = new Observable();
    protected inProgress: Task[] = [];
    protected inProgressObs: Observable<Task[]> = new Observable();
    protected done: Task[] = [];
    protected doneObs: Observable<Task[]> = new Observable();
    protected loggedIn = false;

    protected editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
        const title = task.title;
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '320px',
            data: {
                task,
                enableDelete: true
            }
        });
        dialogRef
            .afterClosed()
            .subscribe((result: TaskDialogResult | undefined) => {
                if (!result) {
                    return;
                }
                const dataList = this[list];
                const taskIndex = dataList.indexOf(task);
                if (this.loggedIn) {
                    runInInjectionContext(this.injector, () => {
                        collectionData(
                            query(
                                collection(this.firestore, list),
                                where('title', '==', title)
                            ),
                            { idField: 'id' }
                        )
                            .pipe(take(1))
                            .subscribe((item) => {
                                runInInjectionContext(
                                    this.injector,
                                    async () => {
                                        if (result.delete) {
                                            await deleteDoc(
                                                doc(
                                                    this.firestore,
                                                    list,
                                                    item[0].id
                                                )
                                            );
                                        } else {
                                            await updateDoc(
                                                doc(
                                                    this.firestore,
                                                    list,
                                                    item[0].id
                                                ),
                                                {
                                                    title: task.title,
                                                    description:
                                                        task.description
                                                }
                                            );
                                        }
                                    }
                                );
                            });
                    });
                } else {
                    if (result.delete) {
                        dataList.splice(taskIndex, 1);
                    } else {
                        dataList[taskIndex] = task;
                    }
                }
            });
    }

    protected drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) {
            return;
        }
        if (!event.container.data || !event.previousContainer.data) {
            return;
        }
        if (this.loggedIn) {
            runInInjectionContext(this.injector, () => {
                collectionData(
                    query(
                        collection(this.firestore, event.previousContainer.id),
                        where(
                            'title',
                            '==',
                            event.previousContainer.data[event.previousIndex]
                                .title
                        )
                    ),
                    { idField: 'id' }
                )
                    .pipe(take(1))
                    .subscribe((item) => {
                        if (!item) {
                            return;
                        }
                        runInInjectionContext(this.injector, async () => {
                            await addDoc(
                                collection(this.firestore, event.container.id),
                                item[0]
                            );
                        });
                        runInInjectionContext(this.injector, async () => {
                            await deleteDoc(
                                doc(
                                    this.firestore,
                                    event.previousContainer.id,
                                    item[0].id
                                )
                            );
                        });
                    });
            });
        }
        transferArrayItem(
            event.previousContainer.data,
            event.container.data,
            event.previousIndex,
            event.currentIndex
        );
    }

    protected newTask(): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '320px',
            data: {
                task: {}
            }
        });
        dialogRef
            .afterClosed()
            .subscribe((result: TaskDialogResult | undefined) => {
                if (!result) {
                    return;
                }
                if (this.loggedIn) {
                    runInInjectionContext(this.injector, async () => {
                        await addDoc(
                            collection(this.firestore, 'todo'),
                            result.task
                        );
                    });
                } else {
                    this.todo.push(result.task);
                }
            });
    }

    protected login(loggedIn: boolean): void {
        if (!loggedIn) {
            return;
        }
        this.loggedIn = true;
        runInInjectionContext(this.injector, () => {
            this.todoObs = collectionData(
                query(collection(this.firestore, 'todo'))
            ) as Observable<Task[]>;
            this.todoObs.subscribe((todos) => (this.todo = todos));
            this.inProgressObs = collectionData(
                query(collection(this.firestore, 'inProgress'))
            ) as Observable<Task[]>;
            this.inProgressObs.subscribe(
                (inProgresses) => (this.inProgress = inProgresses)
            );
            this.doneObs = collectionData(
                query(collection(this.firestore, 'done'))
            ) as Observable<Task[]>;
            this.doneObs.subscribe((dones) => (this.done = dones));
        });
    }
}
