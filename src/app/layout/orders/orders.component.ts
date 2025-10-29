import { Component } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent {
  cols: string[] = ['id', 'customer', 'status'];
  orders = [
    { id: 'ORD001', customer: 'Rahul', status: 'Pending' },
    { id: 'ORD002', customer: 'Amit', status: 'Completed' },
    { id: 'ORD003', customer: 'Sneha', status: 'In Progress' },
  ];
}
