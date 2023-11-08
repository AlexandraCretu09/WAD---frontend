import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap  } from 'rxjs';
import { User } from '../user.model';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private baseUrl = 'http://localhost:8080'; 
  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    const body = { email, password };
    return this.http.post<User>(`${this.baseUrl}/login`, body).pipe(
      tap((user) => {
        this.userLoggedInSubject.next(true);
      })
    );
  }
  logout(): Observable<null> {
    this.userLoggedInSubject.next(false);

    return of(null);
  }

  isAuthenticated(): Observable<boolean> {
    return this.userLoggedInSubject.asObservable();
  }
   
  
  private userEmail!: string;
  
  setUserEmail(email: string) {
    this.userEmail = email;
  }

  getUserEmail() {
    return this.userEmail;
  }
  
}