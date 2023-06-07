import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; 
import { ApiService } from './service/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private loggedInUser = new BehaviorSubject<any>(null);
  logoutEvent: EventEmitter<void> = new EventEmitter<void>();
  loginEvent:EventEmitter<void>=new EventEmitter<void>();
  private users: any[];

  constructor(private http: HttpClient, private router: Router, private apiService : ApiService) {
    this.users = [];
    this.fetchUsers();
  }

  // set the Logged In User
  // setLoggedInUser(user: any) {
  //   this.loggedInUser.next(user);
  // }

  // getLoggedInUser() {
  //   return this.loggedInUser;
  // }

  fetchUsers(): void {
    this.http.get<any[]>('http://localhost:3000/users')
      .pipe(
        catchError(error => {
          console.error('Failed to fetch user data:', error);
          return throwError('Failed to fetch user data');
        })
      )
      .subscribe(users => {
        this.users = users;
      });
  }

  setToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    // this.loggedInUser = null;
    // this.setLoggedInUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('fname');
    this.router.navigate(['login']);
    this.logoutEvent.emit();
    
  }
  

  login({ fname, password }: any): Observable<any> {
    const user = this.users.find(u => u.fname === fname && u.password === password);
    if (user) {
      console.log("Logged In user is:", user.username)
      this.apiService.setLogUser(user);
      // this.header.updateIsCustomer();
      this.setToken('abcdef');
      this.loginEvent.emit();
      return of(user);
    } else {
      return throwError(new Error('Failed to Login'));
    }
  }
  getLoggedInUsername(): string | null {
    // console.log(`Logged in user's username is: ${this.loggedInUser}`)
    // return this.loggedInUser;
    const userToken = this.getToken();
    if (userToken) {
      // You may need to modify this logic based on how you store the user's information
      const user = this.users.find(u => u.token === userToken);
      console.log(`user with tokn is: ${user}`)
      if (user) {
        return user;
      }
    }
    return null;
  }
}
