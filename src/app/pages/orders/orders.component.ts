import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsDialogComponent } from './order-details/order-details.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  cols = ['id','customer','status','pdate','ddate','total','actions'];
  orders: any[] = [];
  selectedStatus = '';

  constructor(
    private dialog: MatDialog,
    private api: ApiService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders() {
    this.api.getOrders().subscribe({
      next: (res) => this.orders = res,
      error: (err) => console.error('Error fetching orders:', err)
    });
  }

  get filtered() {
    if (!this.selectedStatus) return this.orders;
    return this.orders.filter(o => o.status === this.selectedStatus);
  }

  


  openDetails(order: any) {
  const dialogRef = this.dialog.open(OrderDetailsDialogComponent, {
    width: '640px',
    data: { ...order }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.api.updateOrderStatus(result.id, result.status).subscribe({
        next: () => {
          order.status = result.status; // update locally
          console.log('Status updated successfully');
        },
        error: (err) => console.error('Failed to update status', err)
      });
    }
  });
}

}
