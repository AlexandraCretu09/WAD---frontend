import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css']
})
export class ProductsPageComponent {

  constructor(private router: Router) { }

  navigateToProduct(productType: string) {
    this.router.navigate(['/product', productType]);
  }
}
