import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private usersApiUrl = '/api/users';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}/register`, userData).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  authenticateUser(credentials: any): Observable<any> {
    return this.http.post(`${this.usersApiUrl}/login`, credentials).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  logout(): void {
    // Implement the logic to log the user out
  }
}