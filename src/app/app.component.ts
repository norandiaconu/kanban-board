import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Task, TaskComponent } from './task/task.component';

@Component({
    imports: [RouterModule, MatToolbarModule, MatIconModule, TaskComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
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
}
