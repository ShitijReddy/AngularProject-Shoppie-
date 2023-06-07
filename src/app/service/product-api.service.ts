import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { product, user } from 'src/datainterface';
@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  addProductApi(data: product) {
    // console.log(data)
    return this.http.post('http://localhost:3000/productList', data);
  }

  getProductsApi() {
    const cat = "All Items"
    return this.http.get(`http://localhost:3000/productList`);
  }

  updateProductApi(prod: product) {
    // return this.http.put(`http://localhost:3000/productList/${}`, prod);
    return this.http.put<product>(`http://localhost:3000/productList/${prod.prodName}`,prod)
  }

  getFilteredFashion(data:any){
    return this.http.get(`http://localhost:3000/productList?q=${data}`);
  }

  getFilteredAutoCompleted(data: any){
    return this.http.get(`http://localhost:3000/productList?q=${data}`);
  }

  createUser(user: user){
    return this.http.post('http://localhost:3000/users', user);
  }

  getAllUsers() {
    this.http.get('http://localhost:3000/users').subscribe(
      {
        next: (response: any) => {
          // Handle the response data here
          return response;
        },
        error: (error: any) => {
          // Handle any errors that occur during the HTTP request
          console.error(error);
        },
        complete: () => {
          // Handle the completion of the observable if needed
          console.log('Observable completed');
        }
      }
    );

  }

}
