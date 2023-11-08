import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  
  private usersApiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  createUser(userData: any): Observable<any> {

    return this.http.post(`${this.usersApiUrl}/signup`, userData).pipe(

      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);
        return throwError('Error occurred during the HTTP request');
      })

    );
  }
}