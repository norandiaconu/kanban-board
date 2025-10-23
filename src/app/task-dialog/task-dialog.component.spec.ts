import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskDialogComponent } from './task-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('TaskDialogComponent', () => {
    let component: TaskDialogComponent;
    let fixture: ComponentFixture<TaskDialogComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TaskDialogComponent],
            providers: [
                { provide: MAT_DIALOG_DATA, useValue: {} },
                { provide: MatDialogRef, useValue: {} }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TaskDialogComponent);
        component = fixture.componentInstance;
        component['data'].task = {
            id: '123',
            title: '123',
            description: '123'
        };
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
