import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductComponent } from '../components/product/product.component'; // Import the product model

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productsUrl = '/api/products'; // Replace with your API endpoint

  constructor(private http: HttpClient) {}

  // Retrieve a list of products from the server
  getProducts(): Observable<ProductComponent[]> {
    return this.http.get<ProductComponent[]>(this.productsUrl);
  }

  // Retrieve a single product by its ID from the server
  getProductById(id: number): Observable<ProductComponent> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.get<ProductComponent>(url);
  }

  // Add a new product to the server
  addProduct(product: ProductComponent): Observable<ProductComponent> {
    return this.http.post<ProductComponent>(this.productsUrl, product);
  }

  // Update an existing product on the server
  /*updateProduct(product: ProductComponent): Observable<ProductComponent> {
    const url = `${this.productsUrl}/${product.id}`;
    return this.http.put<ProductComponent>(url, product);
  }*/

  // Delete a product from the server
  deleteProduct(id: number): Observable<void> {
    const url = `${this.productsUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}