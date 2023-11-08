import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/user.model';
import { UserAuthService } from 'src/app/services/user-auth.service';
import { Router } from '@angular/router';
import { GetUserService } from 'src/app/services/get-user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent  implements OnInit{

  user: User | null = null;
  isAdminVar : number | undefined;

 

  constructor(
    private authService: UserAuthService,
    private router: Router,
    private userService: GetUserService
    
    ) {}
  isUserLoggedIn: boolean = false; 
  ngOnInit() {
    this.authService.isAuthenticated().subscribe((isLoggedIn) => {
      this.isUserLoggedIn = isLoggedIn;
    });

    
    this.userService.user$.subscribe((user) => {
      this.user = user;
    });
    this.isAdminVar = this.user?.admin;
  }



  navigateToMyAccount() {
    this.router.navigate(['/my-account']);
  }

  isSticky: boolean = false;

  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const scrollPosition = window.scrollY;
    this.isSticky = scrollPosition > 0;
  }
}