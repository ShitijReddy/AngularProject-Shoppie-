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
import { CategoryService } from 'src/app/shared/category.service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit{
  // Show Add To Cart
  
  avgRating !: number;
  // Tags
  selectedTag!: string;
  availableTags!: string[];

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
  searchTags: string[] = [];


  hoverImage: string | null = null;
  hoveredItem: string | null = null;
  // Component code
showNavbar: boolean = false;

toggleNavbar() {
  this.showNavbar = !this.showNavbar;
}

  
  


  constructor(private shared: ApiService, private cartService: CartService,
     private prodApi: ProductApiService, private http: HttpClient,
     private reviewService: ReviewService, private categoryService: CategoryService
    ){
      this.productList = this.filterByCategory("All Items");
      this.filteredProductsByTag = this.filterByCategory("All Items");
     }

  // addToSharedArray() {     this.sharedService.sharedArray = this.productList;   }

  ngOnInit(): void {
    this.loadAvailableTags();
    this.productId = "123"; // Replace with actual product ID
    this.reviewService.getReviewsByProductId(this.productId).subscribe(reviews => {
      this.reviews = reviews;
      this.calculateAverageRating();
    });

    this.newReview.id = this.unqid;
    this.unqid += 1;

    this.categoryService.getCategory().subscribe(category => {
      // Handle the category change
      console.log("Service getting invoked")
      this.filterByCategory(category);
    });

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
    console.log(`this.productList in getProdList: ${this.productList}`)
    return this.productList;
  }
  
  filterByCategory(category: string){
    if(category == "All Items"){
      this.prodApi.getProductsApi()
      .subscribe(res=>{
        this.productList = res;
        console.log(`From Dj Server: ${this.productList}`)
        // this.mainProductList = 
      })
    }
    else {
      this.prodApi.getProductsApi()
      .subscribe(res=>
      {
        this.productList = res;
        const filteredProducts = this.productList.filter((product: any) => product.category.toLowerCase().includes(category.toLowerCase()));
        // console.log(filteredProducts);
        this.productList = filteredProducts
      });
      
      

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
    handleSharedData(data: any) {
      this.avgRating = data;
      console.log('Shared data received:', data);
      // Handle the shared data as needed
    }

    loadAvailableTags(): void {
      // Assuming you have a service method to fetch the available tags
      this.prodApi.getAvailableTags().subscribe(tags => {
        this.availableTags = tags;
      });
    }

    searchProductsByTag() {

      this.prodApi.getProductsApi()
      .subscribe(res=>{
        this.productList = res;
        console.log(`Search tag is: ${this.searchTag}`)
        // this.productList = this.mainProductList;
        this.filteredProductsByTag = this.productList.filter(
          (item : product) => 
          item.tags.includes(this.searchTag.toLowerCase())
        );

        // If we select "Select a tag" then don't apply filter
        if(!( this.searchTag == ""))
        {
          this.shared.setData(this.filteredProductsByTag);
        }
        

      })
    }
    clearSelection() {
      this.searchTags = [];
    }
    
    searchProductsByTags() {
      this.prodApi.getProductsApi().subscribe(res => {
        this.productList = res;
        console.log(`Search tags are: ${this.searchTags}`);
        this.filteredProductsByTag = this.productList.filter(
          (item: product) =>
            this.searchTags.some(tag => item.tags.includes(tag.toLowerCase()))
        );
    
        // If no tags are selected, reset the filter
        if (this.searchTags.length === 0) {
          this.shared.setData(this.productList);
        } else {
          this.shared.setData(this.filteredProductsByTag);
        }
      });
    }

    isUserCustomer(){
      let r;
      this.shared.loguser$.subscribe(
        res => {
           r = res.role;
        }
      );
      if(r == "customer"){
        return true;
      }
      return false;
    }

    
    
    
  }
