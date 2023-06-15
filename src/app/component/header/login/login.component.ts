import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProductApiService } from 'src/app/service/product-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm !: FormGroup;
  allUsers: any;
  isLoggedIn : boolean = false;
  loggedInUserName: any;
  constructor(private service: ProductApiService, private http: HttpClient
              , private auth: AuthService, private _route : Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm.value.username;
      const password = this.loginForm.value.password;
      this.auth.login(this.loginForm.value).subscribe(
    
        (result) => {
          console.log(`Hello ${username}`)
        this._route.navigate([''])
        
        },(err:Error)=>{
        
         alert(err.message);
        
         }
        
         );
    } else {
      // Handle form validation errors or display error messages
      console.log('Invalid form');
    }
  }
  validateUser(username: string, password: string, allUsers:any): boolean {
    console.log(`No of users:${allUsers.length}`)
    for (const user of allUsers){
      if(user.username === username && user.password === password){
        this.isLoggedIn = true;
      }
    
    }
    return this.isLoggedIn;
  }
}
