import { Component, OnInit} from '@angular/core';
import { OrderService } from 'src/app/service/order-service.service';
import { ApiService } from 'src/app/service/api.service';
@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.scss']
})
export class MyProductsComponent implements OnInit{
  public orderedProducts: any;

  constructor(private orderService: OrderService, private apiService: ApiService) { }

  ngOnInit(): void {
    this.orderedProducts = this.orderService.getPendingOrders();
  }
  getVendorName(){
    console.log(`pending orders:${this.orderedProducts}`)
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
