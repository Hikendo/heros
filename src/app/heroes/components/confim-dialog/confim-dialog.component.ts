import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Hero } from '../../interfaces/hero';

@Component({
  selector: 'app-confim-dialog',
  templateUrl: './confim-dialog.component.html',
  styleUrl: './confim-dialog.component.css'
})
export class ConfimDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfimDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Hero) { }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void{
    this.dialogRef.close(true);

  }
}
