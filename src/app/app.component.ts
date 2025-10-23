import { Component, inject } from '@angular/core';
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

@Component({
    imports: [
        RouterModule,
        MatToolbarModule,
        MatIconModule,
        TaskComponent,
        MatCardModule,
        DragDropModule,
        MatButtonModule
    ],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
    private dialog = inject(MatDialog);

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
    protected inProgress: Task[] = [];
    protected done: Task[] = [];

    protected editTask(list: string, task: Task): void {}

    protected drop(event: CdkDragDrop<Task[]>): void {
        if (event.previousContainer === event.container) {
            return;
        }
        if (!event.container.data || !event.previousContainer.data) {
            return;
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
            width: '270px',
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
                this.todo.push(result.task);
            });
    }
}
