import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  stats = [
    { title: 'Total Orders', value: 132 },
    { title: 'Pending Orders', value: 27 },
    { title: 'Active Users', value: 58 },
    { title: 'Revenue', value: '₹45,300' },
  ];
}
