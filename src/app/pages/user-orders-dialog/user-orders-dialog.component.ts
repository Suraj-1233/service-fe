import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-orders-dialog',
  templateUrl: './user-orders-dialog.component.html',
  styleUrls: ['./user-orders-dialog.component.scss']
})
export class UserOrdersDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
