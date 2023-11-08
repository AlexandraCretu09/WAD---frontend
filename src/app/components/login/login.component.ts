import { Component } from '@angular/core';
import { UserAuthService } from '../../services/user-auth.service';
import { GetUserService } from 'src/app/services/get-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null;
  //isAdmin : boolean = false;

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private userAuthService: UserAuthService,
    private getUserService: GetUserService 
    
  ) {}

  onLoginSubmit() {
    this.authService.login(this.email, this.password).subscribe(
      (user) => {
        console.log('User authenticated successfully', user);

        this.getUserService.setUser(user);
        
        this.userAuthService.setUserEmail(this.email);
        

        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Error authenticating user', error);
        this.errorMessage = 'Authentication failed. Please check your credentials.';
      }
    );
  }
  logout() {
    this.authService.logout().subscribe(
      () => {
        console.log('User logged out successfully');
        // You may want to clear any user-related data or tokens here

        // Navigate to the login page or another appropriate destination
        this.router.navigate(['/homepage']);
      },
      (error) => {
        console.error('Error logging out', error);
      }
    );
  }
}