// order-history.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getOrderHistory(token: string): Observable<any> {
    const url = `${this.apiUrl}/order-history`;

    // Add the token to the HTTP headers
    const headers = {
      Authorization: token,
    };

    return this.http.get(url, { headers });
  }
}
