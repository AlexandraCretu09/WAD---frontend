import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})


export class ProductComponent implements OnInit {
  product: any; // Define a product variable to hold the product data.

  constructor(private route: ActivatedRoute, private productService: ProductService) {}

  ngOnInit(): void {
    const productIdParam = this.route.snapshot.paramMap.get('product_id');
    
    // Check if productIdParam is not null and is a valid number
    if (productIdParam !== null) {
      const productId = +productIdParam; // Convert the string to a number using the + operator or parseInt()
    
      if (!isNaN(productId)) {
        this.productService.getProductById(productId).subscribe((data) => {
          this.product = data;
        });
      } else {
        // Handle the case where 'product_id' is not a valid number
        console.error('Invalid product_id parameter');
      }
    } else {
      // Handle the case where 'product_id' is not in the route
      console.error('product_id parameter not found in route');
    }
  }
  
}


