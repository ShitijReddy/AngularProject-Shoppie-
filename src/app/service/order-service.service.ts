import { Injectable, VERSION } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from './api.service';
import { Review } from 'src/datainterface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderedProducts: any[] = [];

  constructor(private http: HttpClient, private apiService : ApiService) { }

  addOrderedProduct(product: any) {
    for(const prod of product){
      console.log(`product vendorName (addOrder) is: ${prod.vendorName}`)
      // prod.vendorName = this.apiService.loguser$;
      this.apiService.loguser$.subscribe(user => {
        if (user) {
          prod.custName = user.username;
          console.log(`Logged in user's username in order service: ${prod.custName}`)
          // Use the username as needed
        }
      });
      this.orderedProducts.push(prod);
      this.saveOrderedProduct(prod);
    }
    
  }

  getOrderedProducts() {
    let customerName = "";
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        customerName = user.username;
        console.log(`customerName in getOrderedProd is: ${customerName}`);
      }
    });
    // console.log(`Ordered products in get: ${this.orderedProducts}`);
    // return this.orderedProducts.filter((product) => product.custName == customerName);
    this.http.get('http://127.0.0.1:8000/api/orders/')
    .subscribe({
      next: response => {
        this.orderedProducts = response as any[];
      },
      error: error => {
        console.error('Failed to save ordered product:', error);
      }
    });
    return this.orderedProducts.filter(
      (product) => product.custName == customerName
    );
  }

  getPendingOrders() {
    let vName = "";
    this.apiService.loguser$.subscribe(user => {
      if (user) {
         vName= user.username;
        console.log(`vName in getPendingOrders is: ${vName}`);
      }
    });
    this.http.get('http://127.0.0.1:8000/api/orders/')
    .subscribe({
      next: response => {
        this.orderedProducts = response as any[];
      },
      error: error => {
        console.error('Failed to save ordered product:', error);
      }
    });
    return this.orderedProducts.filter(
      (product) => product.vendorName == vName
    );
  }

  clearOrderedProducts() {
    this.orderedProducts = [];
  }

  saveOrderedProduct(product: any) {
    let userlogName = "noname"; // Initially no name => after login fetch username
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        userlogName = user.username;
        console.log(`Logged in user's username in save order: ${userlogName}`)
        // Use the username as needed
      }
    });
    
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'X-User-ID': userlogName, // Include any other relevant user data
    // });

    this.http.post('http://127.0.0.1:8000/api/orders/', product)
      .subscribe({
        next: response => {
          console.log('Ordered product saved successfully:', response);
        },
        error: error => {
          console.error('Failed to save ordered product:', error);
          if (error.status === 500) {
            // Display a pop-up message to the user indicating that ordering is not allowed
            alert('You are not allowed to order as a vendor');
            // Alternatively, you can use a modal dialog or any other UI component to display the message
          } else {
            // Handle other error cases if needed
          }
        }
      });
  }
  
  getReviews(productTitle:string):Observable<Review[]>{

    const url1 = `http://127.0.0.1:8000/api/reviewlist/${productTitle}/`;

    return this.http.get<Review[]>(url1);

  }

}
