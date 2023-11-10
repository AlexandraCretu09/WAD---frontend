import { Component } from '@angular/core';
import { GetUserService } from 'src/app/services/get-user.service';
import { User } from 'src/app/user.model';
import { HttpClient } from '@angular/common/http';
import { ProductServiceService } from 'src/app/services/product-service.service';
import { oneProduct } from 'src/app/one-product.model';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  users: User[] = [];
  products: oneProduct[] = [];

  constructor(
    private userService : GetUserService,
    private httpClient: HttpClient,
    private productService : ProductServiceService
    ){}
  

  ngOnInit() {
    this.loadUsers();
    this.loadProducts();
  }

  loadUsers() {
    this.userService.user$.subscribe((user) => {
      const email = user?.email;
      if (email) {
        const springBackendUrl = 'http://localhost:8080';
        const endpoint = '/all';
        const observable = this.httpClient.get<User[]>(`${springBackendUrl}${endpoint}`);

        observable.subscribe({
          next: (data) => {
            this.users = data;
          },
          error: (error) => {
            console.error('Error retrieving the data:', error);
          },
        });
      }
    });
  }


  loadProducts() {
  this.userService.user$.subscribe((user) => {
    const email = user?.email;
    if (email) {
      const springBackendUrl = 'http://localhost:8080';
      const endpoint = '/allProducts';
      const observable = this.httpClient.get<oneProduct[]>(`${springBackendUrl}${endpoint}`);

      observable.subscribe({
        next: (data) => {
          this.products = data;
          //console.log('Products:', this.products);
        },
        error: (error) => {
          console.error('Error retrieving products in Angular:', error);
        },
      });
    }
  });
}


  deleteUser(user: User) {
    const springBackendUrl = 'http://localhost:8080';
    const endpoint = '/deleteAccount';

    this.httpClient
      .delete(`${springBackendUrl}${endpoint}?email=${user.email}`)
      .subscribe(
        () => {
          console.log('Account deleted successfully');
          this.users = this.users?.filter((u) => u.email !== user.email);
        },
        (error) => {
          console.error('Error deleting account', error);
        }
      );
  }

  deleteProduct(product: oneProduct) {
    const springBackendUrl = 'http://localhost:8080';
    const endpoint = '/deleteProduct';

    //this.productService.deleteProduct(product.id)
    this.httpClient
    .delete(`${springBackendUrl}${endpoint}?id=${product.id}`)
    .subscribe(
      () => {
        console.log('Product deleted successfully');
        // Remove the deleted product from the local array
        this.products = this.products.filter((p) => p.id !== product.id);
      },
      (error) => {
        console.error('Error deleting product:', error);
      }
    );
  }

  toggleAdminStatus(user: User) {
    user.admin = user.admin === 0 ? 1 : 0; 
    this.updateAdminStatus(user);
  }

  updateAdminStatus(user: User) {
    const springBackendUrl = 'http://localhost:8080';
    const endpoint = '/updateAdminStatus';
    
    this.httpClient
      .put(`${springBackendUrl}${endpoint}?id=${user.id}&admin=${user.admin}`, null)
      .subscribe(
        (data) => {
          console.log('Admin status updated successfully on the server');
        },
        (error) => {
          console.error('Error updating admin status on the server', error);
        }
      );
  }
}


