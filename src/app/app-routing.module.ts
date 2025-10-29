import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ItemsComponent } from './pages/items/items.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminAuthGuard } from './guards/admin-auth.guard'; // ✅ Import guard

const routes: Routes = [
  { path: 'login', component: LoginComponent },

  // ✅ Protected routes
  { path: 'dashboard', component: DashboardComponent, canActivate: [AdminAuthGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [AdminAuthGuard] },
  { path: 'items', component: ItemsComponent, canActivate: [AdminAuthGuard] },
  { path: 'customers', component: CustomersComponent, canActivate: [AdminAuthGuard] },

  // ✅ Redirects
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
