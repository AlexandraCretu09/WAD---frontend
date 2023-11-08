import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { oneProduct } from '../one-product.model';

@Injectable({
  providedIn: 'root'
})
export class GetProductService {

  private productSubject: BehaviorSubject<oneProduct[]> = new BehaviorSubject<oneProduct[]>([]);
  product$: Observable<oneProduct[]> = this.productSubject.asObservable();

  
  addProduct(product: oneProduct): void {
    const currentProducts = this.productSubject.value;
    if (currentProducts) {
      
      currentProducts.push(product);
      this.productSubject.next(currentProducts);
  }
  }
}
