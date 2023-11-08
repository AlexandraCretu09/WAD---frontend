import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../user.model';

@Injectable({
  providedIn: 'root'
})
export class GetUserService {

  

  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  setUser(user: User) {
    this.userSubject.next(user);
  }
  
}
