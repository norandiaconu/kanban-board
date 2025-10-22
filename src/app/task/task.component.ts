import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

export interface Task {
    id?: string;
    title: string;
    description: string;
}

@Component({
    selector: 'app-task',
    imports: [MatCardModule],
    templateUrl: './task.component.html',
    styleUrl: './task.component.scss'
})
export class TaskComponent {
    public readonly task = input<Task | null>(null);
    protected readonly edit = output<Task>();

    protected doubleClick(): void {
        this.edit.emit(this.task());
    }
}
