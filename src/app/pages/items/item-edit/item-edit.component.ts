import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditDialogComponent {
  model: any = { name: '', category: '', price: 0 };

  constructor(
    public dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data) this.model = { ...data };
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.model);
  }
}
