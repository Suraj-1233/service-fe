import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // private baseUrl = 'http://localhost:8080/api'; // Spring Boot URL
   private baseUrl = 'https://service-be-nagh.onrender.com/api'; // Spring Boot URL

  

  constructor(private http: HttpClient) {}

  // Orders
  getOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/orders`, this.getHeaders());
}

  getOrder(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/${id}`);
  }

  updateOrder(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${id}`, data);
  }

  /// Items
  getItems(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/items`);
  }

  addItem(item: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/items`, item, this.getHeaders());
  }

  updateItem(id: string, item: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/items/${id}`, item, this.getHeaders());
  }

  deleteItem(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/items/${id}`, this.getHeaders());
  }

  // Customers
  
  getAllCustomers(): Observable<any[]> {
    
    return this.http.get<any[]>(`${this.baseUrl}/users`,  this.getHeaders() );
  }

  // Reviews
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/reviews`);
  }

  // Reports
  getReportSummary(): Observable<any> {
    return this.http.get(`${this.baseUrl}/reports/summary`);
  }

  getDashboardStats(): Observable<any> {
  return this.http.get(`${this.baseUrl}/dashboard/stats`, this.getHeaders());
}

getRecentOrders(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/dashboard/recent`, this.getHeaders());
}


getOrdersByUser(userId: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/orders/user/${userId}`, this.getHeaders());
}
getUserOrders(userId: string) {
  return this.http.get<any[]>(`${this.baseUrl}/admin/user/${userId}/orders`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
  });
}

adminLogin(data: any): Observable<any> {
  return this.http.post(`${this.baseUrl}/auth/login`, data);
}

updateOrderStatus(orderId: string, status: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/orders/${orderId}/status?status=${status}`, {},this.getHeaders());
  }

  private getHeaders() {
  const adminData = localStorage.getItem('admin');
  const token = adminData ? JSON.parse(adminData).token : null;

  return {
    headers: new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    })
  };
}

}
