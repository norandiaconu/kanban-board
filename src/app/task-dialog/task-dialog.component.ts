import { Component, inject } from '@angular/core';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { Task } from '../task/task.component';
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogRef
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule, MatFabButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

export interface TaskDialogData {
    task: Partial<Task>;
    enableDelete: boolean;
}

export interface TaskDialogResult {
    task: Task;
    delete?: boolean;
}

@Component({
    selector: 'app-task-dialog',
    imports: [
        MatFormFieldModule,
        MatDialogClose,
        FormsModule,
        MatButtonModule,
        MatDialogActions,
        MatLabel,
        MatInputModule,
        MatIconModule,
        MatFabButton
    ],
    templateUrl: './task-dialog.component.html',
    styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent {
    protected data = inject<TaskDialogData>(MAT_DIALOG_DATA);
    private dialogRef = inject<MatDialogRef<TaskDialogComponent>>(MatDialogRef);

    private backupTask: Partial<Task> = { ...this.data.task };

    protected cancel(): void {
        this.data.task.title = this.backupTask.title;
        this.data.task.description = this.backupTask.description;
        this.dialogRef.close();
    }
}
