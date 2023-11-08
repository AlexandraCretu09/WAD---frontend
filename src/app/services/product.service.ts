import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetProductService } from './get-product.service';
import { oneProduct } from '../one-product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private usersApiUrl = 'http://localhost:8080'; // Replace with your actual backend URL
  private productEndpoint = '/product';

  constructor(private http: HttpClient, private getProductService: GetProductService) {}

  postData(formData: any): Observable<any> {
    const productUrl = this.usersApiUrl + this.productEndpoint;

    return this.http.post(productUrl, formData).pipe(
      map((response: any) => {
        // Assuming the response contains the product data, update the GetProductService
        const product: oneProduct = response;
        this.getProductService.addProduct(product);
        return response; // Return the response from the HTTP post
      })
    );
  }
}