import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { ProductApiService } from 'src/app/service/product-api.service';
import { ReviewService } from 'src/app/service/review.service';

import { ChartDataset, ChartType } from 'chart.js';

import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';

import { Review } from 'src/datainterface';
import { product } from 'src/datainterface';
// import { Component } from '@angular/core';
// import { ChartType } from 'chart.js';
import { ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit{
  isAllItemsSelected: boolean = true;
  isFashion:boolean=false;
  public productList: any;
  public mainProductList: any;
  public filteredProductList: any ;
  selectedCategory: string = 'All Items';
  // filteredProducts: any[] = [];
  private name: string = "";
  private receivedBoolean = true;
  public unqid: number = 100;
  productId!: string;

  selectedProduct: any | null = null;
  averageRating!: number;
  reviews: Review[] =[];
  newReview: Review = {
    productId: '', userId: '', rating: 0, content: '', createdAt: new Date(),
    id: this.generateUniqueId()
  };


  compareList: any[] = [];
  compareDataSource: MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'price', 'category', 'actions'];
  @ViewChild('compareTable') compareTable: any;

  filteredProductsByTag: any;
  searchTag: string = "";

  
  


  constructor(private shared: ApiService, private cartService: CartService,
     private prodApi: ProductApiService, private http: HttpClient,
     private reviewService: ReviewService
    ){
      this.productList = this.filterByCategory("All Items");
      // this.filteredProductsByTag = this.filterByCategory("All Items");
     }

  // addToSharedArray() {     this.sharedService.sharedArray = this.productList;   }

  ngOnInit(): void {
    this.productId = "123"; // Replace with actual product ID
    this.reviewService.getReviewsByProductId(this.productId).subscribe(reviews => {
      this.reviews = reviews;
      this.calculateAverageRating();
    });

    this.newReview.id = this.unqid;
    this.unqid += 1;

    if(true){
      this.shared.data$.subscribe(data => {
        this.filteredProductList = data;
        this.productList = this.filteredProductList
        this.mainProductList = this.productList
      });


    }
    else {
        this.prodApi.getProductsApi()
      .subscribe(res=>{
        
        this.productList = res;
        console.log("This is shared",this.productList);

        
        // this.productList = this.productList.filter((item : product) => item.prodName.toLowerCase().includes("phone"));
        console.log(this.filteredProductList)
        // Assigning initial quant and total
        this.productList.forEach((a:any)=> {
          Object.assign(a,{quantity:1, total:a.price});
        });

        
      })
    }
    
    

    
  }


  addtocart(item: any) {
    // Calling the service
    this.cartService.addToCart(item);
    this.compareList = [];
    this.compareDataSource.data = [];
    // updating quantity
    // this.prodApi.updateProductApi(item)
    // .subscribe((res)=>{
    //   console.log(res);
    // })
    // this.addToSharedArray();
    
    // const updatedItem = { ...item, quant: item.quant - 1 }; // Update the quant property

    // const url = `http://localhost:3000/productList?prodName=${item.prodName}`;

      const updatedItem = { ...item, quant: item.quant - 1 };
      item.quant -= 1;
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

  getProductList() {
    return this.productList;
  }
  
  filterByCategory(category: string){
    if(category == "All Items"){
      this.prodApi.getProductsApi()
      .subscribe(res=>{
        this.productList = res;
        // this.mainProductList = 
      })
    }
    else {
      this.prodApi.getFilteredFashion(category)
      .subscribe(res=>{
        this.productList = res;
      })
    }
  }
  
  addReview() {
    if (this.selectedProduct) {
      const newReview: Review = {
        rating: this.newReview.rating,
        content: this.newReview.content,
        userId: "3535",
        productId: this.selectedProduct.id,
        id: 0,
        createdAt: new Date
      };

      this.http.post('http://localhost:3000/reviews', newReview)
        .subscribe(
          response => {
            console.log('Review created successfully:', response);
            this.reviews.push(newReview);
            // Perform any necessary actions after successful creation
          },
          error => {
            console.error('Failed to create review:', error);
            // Handle error if needed
          }
        );
    }
  }

  selectProduct(product: any) {
    this.selectedProduct = product;
    this.loadReviews(product.id);
  }

  loadReviews(productId: string) {
    this.http.get(`http://localhost:3000/reviews?productId=${productId}`)
      .subscribe(
        (response) => {
          console.log('Reviews loaded successfully:', response);
          this.reviews = response as Review[];
        },
        error => {
          console.error('Failed to load reviews:', error);
          // Handle error if needed
        }
      );
  }


    submitReview(productId: string) {
      const newReview: Review = {
        rating: this.newReview.rating,
        content: this.newReview.content,
        userId: "555",
        productId: productId,
        id: 0,
        createdAt: new Date
      };
  
      // Generate unique ID for the review
      newReview.id = this.generateUniqueId();
  
      // Send the HTTP request to create the review
      this.http.post('http://localhost:3000/reviews', newReview)
        .subscribe(
          response => {
            console.log('Review created successfully:', response);
            this.reviews.push(newReview); // add the review to the reviews array
            // Perform any necessary actions after successful creation
          },
          error => {
            console.error('Failed to create review:', error);
            // Handle error if needed
          }
        );
    }

    calculateAverageRating() {
      const sum = this.reviews.reduce((total, review) => total + review.rating, 0);
      this.averageRating = sum / this.reviews.length;
    }

    private generateUniqueId(): number {
      // Generate a unique ID here using any logic you prefer
      // For simplicity, this example generates a random number between 1 and 1000
      return Math.floor(Math.random() * 1000) + 1;
    }

    toggleCompareProduct(event: MatCheckboxChange, product: any) {
      if (event.checked) {
        this.compareList.push(product);
      } else {
        const index = this.compareList.findIndex((item) => item.id === product.id);
        if (index !== -1) {
          this.compareList.splice(index, 1);
        }
      }
      this.compareDataSource.data = this.compareList;
    }

    searchProductsByTag() {

      this.prodApi.getProductsApi()
    .subscribe(res=>{
      this.productList = res;
      console.log(`Search tag is: ${this.searchTag}`)
      // this.productList = this.mainProductList;
      this.filteredProductsByTag = this.productList.filter(
        (item : product) => 
        item.tags.concat().join("").toLowerCase().includes(this.searchTag.toLowerCase())
      );
      this.shared.setData(this.filteredProductsByTag);
      

    })


      
      // if (this.searchTag.trim().toLowerCase() === '') {
      //   this.filteredProductsByTag = this.productList;
      // } else {
      //   this.productList = this.productList.filter((product: any) =>
      //     product.tags.include(this.searchTag.toLowerCase())
      //   );
      // }
    }
    
  }