import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';
import { UserService } from 'src/app/service/user-service.service';
import { v4 as uuidv4 } from 'uuid';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  animations: [
    trigger('fadeInScaleAnimation', [
      state('void', style({ opacity: 0, transform: 'scale(0.8)' })),
      transition(':enter, :leave', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class SignupComponent {
  signupForm: FormGroup;

  constructor(private http: HttpClient, private userService: UserService, private service : ProductApiService) {
    this.signupForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('customer', Validators.required),
    });
  }


  onSignUp() {
    if (this.signupForm.invalid) {
      // Handle invalid form submission
      return;
    }
  
    const username = this.signupForm.value.username;
    const password = this.signupForm.value.password;
    const role = this.signupForm.value.role;
    const id = uuidv4();
  
    const user = { username, password, role, id};
    
  
    // Make a POST request to store the user in the JSON server
    
      this.service.createUser(user).subscribe(response => {
        console.log('User created:', response);
      });
    }
}
  

  // onSignUp() {
  //   if (this.signupForm.invalid) {
  //     // Handle invalid form submission
  //     return;
  //   }

  //   const username = this.signupForm.value.username;
  //   const password = this.signupForm.value.password;
  //   const role = this.signupForm.value.role;

  //   // Perform signup logic based on the role
  //   if (role === 'customer') {
  //     // Signup as a customer
  //   } else if (role === 'retailer') {
  //     // Signup as a retailer
  //   }
  // }
// }
