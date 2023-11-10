import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { oneProduct } from 'src/app/one-product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  private springBackendUrl = 'http://localhost:8080';
  private endpoint = '/product';

  constructor(private httpClient: HttpClient) {}

  getAllProducts(): Observable<oneProduct[]> {
    return this.httpClient.get<oneProduct[]>(`${this.springBackendUrl}${this.endpoint}`);
  }
}
