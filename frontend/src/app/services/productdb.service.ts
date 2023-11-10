import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductDBService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  initiatePurchase(order: any, token: string): Observable<any> {
    const url = `${this.apiUrl}/save-receipt`;

    // Add the token to the HTTP headers
    const headers = {
      Authorization: token,
    };

    return this.http.post(url, order, { headers });
  }

}
