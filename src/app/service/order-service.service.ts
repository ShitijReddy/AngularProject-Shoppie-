import { Injectable, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiService } from './api.service';

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
    this.http.get('http://localhost:3000/myorders')
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
    this.http.get('http://localhost:3000/myorders')
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
    this.http.post('http://localhost:3000/myorders', product)
      .subscribe({
        next: response => {
          console.log('Ordered product saved successfully:', response);
        },
        error: error => {
          console.error('Failed to save ordered product:', error);
        }
      });
  }
}
