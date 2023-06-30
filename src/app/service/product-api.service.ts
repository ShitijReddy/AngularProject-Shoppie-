import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review, product, user } from 'src/datainterface';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductApiService {

  constructor(private http: HttpClient) { }

  

  getProductsApi() {
    // return this.http.get(`http://localhost:3000/productList`);

                // Data from Django Server    
    return this.http.get<any>('http://127.0.0.1:8000/api/products/').pipe(
      map(response => response.products)
    );
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
    // return this.http.post('http://localhost:3000/users', user);
    let data={
      'userid':10,
      'username':user.username,
      'password':user.password,
      'role':user.role
    }
    console.log(`data is ${data}`);
    return this.http.post('http://127.0.0.1:8000/api/signup/', data);
  }

  addProductApi(data: product) {
    // console.log(data)
    return this.http.post('http://127.0.0.1:8000/api/products/', data);
    
  }

  addReviewApi(newReview: Review){
    this.http.post('http://localhost:3000/reviews', newReview);
  }

  

  getAllUsers() {
    this.http.get('http://127.0.0.1:8000/api/users/').subscribe(
      {
        next: (response: any) => {
          // Handle the response data here
          return response.users;
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

  getAvailableTags(): Observable<string[]> {
    return this.http.get<product[]>(`http://localhost:3000/productList`).pipe(
      map((products: product[]) => this.extractTags(products))
    );
  }

  private extractTags(products: product[]): string[] {
    const tagsSet = new Set<string>();
    products.forEach(product => {
      product.tags.forEach(tag => {
        tagsSet.add(tag.toLowerCase());
      });
    });
    return Array.from(tagsSet);
  }

}
