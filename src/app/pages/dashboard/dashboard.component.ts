import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats = [
    { title: 'Total Orders', value: 0, icon: 'shopping_bag' },
    { title: 'Pending', value: 0, icon: 'hourglass_top' },
    { title: 'Completed', value: 0, icon: 'done_all' },
    { title: 'Revenue', value: '₹0', icon: 'attach_money' }
  ];

  recentOrders: any[] = [];
  cols = ['id', 'customer', 'status', 'date', 'total'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    // ✅ Load dashboard statistics
    this.api.getDashboardStats().subscribe({
      next: (res) => {
        this.stats = [
          { title: 'Total Orders', value: res.totalOrders, icon: 'shopping_bag' },
          { title: 'Pending', value: res.pending, icon: 'hourglass_top' },
          { title: 'Completed', value: res.completed, icon: 'done_all' },
          { title: 'Revenue', value: '₹' + res.revenue.toLocaleString(), icon: 'attach_money' }
        ];
      },
      error: (err) => console.error('Error fetching stats:', err)
    });

    // ✅ Load recent orders
    this.api.getRecentOrders().subscribe({
      next: (res) => {
        this.recentOrders = res.map((o: any) => ({
          id: o.id,
          customer: o.customerName || 'N/A',
          status: o.status,
          date: new Date(o.createdAt).toLocaleDateString(),
          total: '₹' + o.totalAmount
        }));
      },
      error: (err) => console.error('Error fetching recent orders:', err)
    });
  }
}
