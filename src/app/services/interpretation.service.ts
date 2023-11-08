import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InterpretationService {

  private usersApiUrl = 'http://localhost:8080'; // Replace with your actual backend URL
  private productEndpoint = '/interpretation';

  constructor(private http: HttpClient) {}

  postData(formData: any): Observable<any> {
    const productUrl = this.usersApiUrl + this.productEndpoint;

    return this.http.post(productUrl, formData);
  }
}
