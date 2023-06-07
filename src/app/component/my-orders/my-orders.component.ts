import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { OrderService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss']
})
export class MyOrdersComponent implements OnInit {
  public orderedProducts: any;

  constructor(private orderService: OrderService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.orderedProducts = this.orderService.getOrderedProducts();
  }
  
  getCustName(){
    let customerName = "";
    this.apiService.loguser$.subscribe(user => {
      if (user) {

        customerName = user.username;
        console.log(`customerName in getCustName is: ${customerName}`);
        
      }
      
    });
    return customerName;
  }
}
