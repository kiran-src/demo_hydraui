import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-edit-dialog',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule, MatDialogModule],
    templateUrl: './edit-dialog.component.html',
})
export class EditDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<EditDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { name: string }
    ) {}

    onNoClick(): void {
        this.dialogRef.close();
    }
}
