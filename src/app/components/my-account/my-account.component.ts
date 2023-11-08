import { Component, OnInit } from '@angular/core';
import { GetUserService } from 'src/app/services/get-user.service';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { User } from 'src/app/user.model';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { oneProduct } from 'src/app/one-product.model';


@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit{
  user: User | null = null;
  contentData: oneProduct[] = [];

  constructor(
    private userService: GetUserService, 
    private authService : UserAuthService,
    private router: Router,
    private httpClient: HttpClient
    
    ) {}

  maskPassword(password: string | undefined): string {
    if (password) {
      return '*'.repeat(password.length);
    } else {
      return '';
    }
  }
  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('User logged out successfully');
        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Error logging out', error);
      }
    );
  }

  deleteAccount() {
    if (this.user) {
      const email = this.user.email;
      if (email) {
        const springBackendUrl = 'http://localhost:8080';
        const endpoint = '/deleteAccount';
        
        this.httpClient.delete(`${springBackendUrl}${endpoint}?email=` + email).subscribe(
          () => {
            console.log('Account deleted successfully');
            // Perform any additional cleanup or logout actions
            this.authService.logout().subscribe(() => {
              console.log('User logged out after account deletion');
              // Redirect the user to the homepage or another appropriate destination
              this.router.navigate(['/homepage']);
            });
          },
          (error) => {
            console.error('Error deleting account', error);
          }
        );
      }
    }
  }


  ngOnInit() {
    this.userService.user$.subscribe((user) => {
      this.user = user;
      
    });
    const email = this.user?.email;
    if (email) {

      const springBackendUrl = 'http://localhost:8080'; 
      const endpoint = '/contentCreation';
      //console.log('Email:', email);
      const observable = this.httpClient.get<oneProduct[]>(`${springBackendUrl}${endpoint}?email=` + email);
      observable.subscribe({
        next: (data) => {
          console.log('Response Data:', data);
          this.contentData = data;
        },
        error: (error) => {
          console.error('Error retrieving the data:', error);
        },
      });
      
    }
  }

  /*
  
  */
}

