import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  public products : any = [];
  public grandTotal : number = 0;

  constructor(private cartService : CartService, private http: HttpClient
              , private orderService: OrderService, private authService: AuthService){ }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=> {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
      // this.grandTotal = this.calcGrandTotal();
    })
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
    this.incQuantValue(item);
    
  }
  
  incQuantValue(item: any){
    const updatedItem = { ...item, quant: item.quant + 1 };
      // item.quant -= 1;
      this.http.patch('http://localhost:3000/productList/' + item.id, updatedItem)

      // this.http.patch(url, updatedItem)
      .subscribe({
          next : (response) => {
          console.log('Item quantity updated successfully:', response);
          }, 
          error: (error) => {
          console.error('Error updating item quantity:', error);
          }
      });
  }

  emptyCart() {
    // for()
    for (const item of this.products) {
      console.log("Products:",this.products)
      this.incQuantValue(item);
      // console.log("Quant:", item.quant)

    }
    this.cartService.removeAllCart();
  }

  checkingOut(){
    console.log("Above for loop")
    for(const prod of this.products){
      
      // prod.custName = this.authService.getLoggedInUsername();
      // prod.username = prod.custName;
      // console.log("Customer Name is:",prod.custName);
    }
    console.log("Coming till checking out")
    this.orderService.addOrderedProduct(this.products);
    this.products.length = 0;
    
    this.cartService.removeAllCart();
  }
  
  q: { [itemId: string]: number } = {};

  updateQuantity(item: any, change: number) {
    if (this.q[item.id]) {
      this.q[item.id] += change;
    } else {
      this.q[item.id] = 1;
    }
    
    item.quant = this.q[item.id];

    if(item.quant > 1){
      item.discount = 0.1;
      item.total = item.price*item.quant;
      item.total -= item.total*item.discount;
    }
    else {
      item.discount = 0;
      item.total = item.price;
    }
  }
  


  setBaseQuant(item: any) {
    item.quant = 1;
  }

  
  

}
 