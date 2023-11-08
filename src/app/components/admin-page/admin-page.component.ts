import { Component } from '@angular/core';
import { GetUserService } from 'src/app/services/get-user.service';
import { User } from 'src/app/user.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  users: User[] = [];

  constructor(private userService : GetUserService, private httpClient: HttpClient){}
  

  ngOnInit() {
    this.loadUsers();
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


