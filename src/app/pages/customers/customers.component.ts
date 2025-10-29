import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { UserOrdersDialogComponent } from '../user-orders-dialog/user-orders-dialog.component';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
  cols = ['name', 'email', 'phone', 'orders', 'actions'];
  customers: any[] = [];
  isLoading = true;

  constructor(private apiService: ApiService, private dialog: MatDialog) {}  // ✅ FIXED HERE

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.apiService.getAllCustomers().subscribe({
      next: (res) => {
        this.customers = res;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching customers:', err);
        this.isLoading = false;
      }
    });
  }

  // ✅ Open dialog to show user’s orders
  viewOrders(customer: any) {
    this.apiService.getOrdersByUser(customer.id).subscribe({
      next: (orders) => {
        this.dialog.open(UserOrdersDialogComponent, {
          width: '700px',
          data: { user: customer, orders }
        });
      },
      error: (err) => {
        console.error('Error fetching orders for user:', err);
      }
    });
  }

  blockCustomer(c: any) {
    alert(`Block ${c.name}?`);
  }
}
