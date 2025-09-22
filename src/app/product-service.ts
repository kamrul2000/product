import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'https://765ac5e9-a27d-4c3e-9426-e2e6ff8f3803.mock.pstmn.io/products';
private http=inject(HttpClient);
  // constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }
  addProduct(p: Product) {
    return this.http.post(this.apiUrl, p);
  }
  updateproduct(p: Product) {
    return this.http.put(`${this.apiUrl}?id=${p.id}`, p)
  }
  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}?id=${id}`);
  }
}
