import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    this.http.get<any>('http://127.0.0.1:8000/api/signup/')
      .pipe(
        map(response => response.users)
        
      )
      .subscribe(users => {
        this.users = users;
        console.log(`users in fetchUsers: ${users.length}`)
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
  

  // login({ username, password }: any): Observable<any> {
  //   for(const use of this.users){
  //     console.log(`use.username is ${use.username}`);
  //   }
  //   const userr = this.users.find(u => u.username == username && u.password === password);
  //   if (userr) {
  //     console.log("Logged In user issssss:", userr.username)
  //     this.apiService.setLogUser(userr);
  //     // this.header.updateIsCustomer();
  //     this.setToken('abcdef');
  //     this.loginEvent.emit();
  //     return of(userr);
  //   } else {
  //     return throwError(new Error('Failed to Login'));
  //   }
  // }
  
  // login(credentials: { username: string; password: string }): Observable<any> {
  //   return this.http.post('http://127.0.0.1:8000/api/login/', credentials, { withCredentials: true });
  // }

  login(username: any, password: any): Observable<any> {
    return this.http.get<any>('http://localhost:8000/api/loginBackend/' + username + '/' + password + '/')
    .pipe(
    map(response => {
      const userr = this.users.find(u =>  u.password == password);
      if (userr) {
        console.log("Logged In user issssss:", userr.username)
        this.apiService.setLogUser(userr);
        // this.header.updateIsCustomer();
      }
    console.log(response);
    this.setToken(response.result);
    return response.result;
    }),
    catchError(error => {
    console.error(error);
    return throwError(new Error('Failed to Login'));
    })
    );
    }

  private getCookie(name: string):any{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return "123"; // Add the missing return statement for the undefined case
    }

  loginPerson(username: any, password: any){
    let data={
    "username":username,
    "password":password
    }
    const userr = this.users.find(u =>  u.password == password);
    if (userr) {
      console.log("Logged In user issssss:", userr.username)
      this.apiService.setLogUser(userr);
      this.setToken(userr+"11");
      // this.header.updateIsCustomer();
    }
    const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'X-CSRFToken': this.getCookie('csrftoken') // Replace 'csrftoken' with the name of your CSRF token cookie
    });
    return this.http.post('http://localhost:8000/api/login/',data, { headers: headers })
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
