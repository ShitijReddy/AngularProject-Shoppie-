import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUsers() {
    return this.http.get('http://localhost:3000/users');
  }

  createUser(user: any) {
    return this.http.post('http://localhost:3000/productList', user);
  }
}
