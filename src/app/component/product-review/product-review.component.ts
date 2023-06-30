import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/datainterface';
import { ApiService } from 'src/app/service/api.service';

import { ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';


import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-review',
  templateUrl: 'product-review.component.html',
  styleUrls: ['product-review.component.css'],
  // imports: ['ReactiveForms']

})
export class ProductReviewComponent implements OnInit {
  @Output() dataShared = new EventEmitter<any>();
  newReview!: Review;

  // Method to share data
  shareData() {
    const data = `${this.calculateAverageRating()}`;
    this.dataShared.emit(data);
  }

  @ViewChild(MatSlider)
  slider!: MatSlider;
  showReviewForm: boolean = false;
  showReviews: boolean = false;

  reviewForm!: FormGroup;

  @Input()
  productId!: string;
  reviews: Review[] = [];

  oneStarCnt: number = 0;
  twoStarCnt: number = 0;
  threeStarCnt: number = 0;
  fourStarCnt: number = 0;
  fiveStarCnt: number = 0;

   uuname: string = "noname";
  constructor(private http: HttpClient, private apiService: ApiService, private formBuilder: FormBuilder,
    private prodApi: ProductApiService) { }

  ngOnInit() {
    
    this.loadReviews();
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      comment: ['', Validators.required],
      // author: ['', Validators.required]
    });
    this.fetchReviews(this.productId);
    
    this.apiService.loguser$.subscribe(
      res => {
        this.uuname = res.username;
      }
    );
  }

  loadReviews() {
    this.http.get(`http://localhost:3000/reviews`)
      .subscribe(
        response => {
          // this.reviews = response as Review[];
        },
        error => {
          console.error('Failed to fetch reviews:', error);
          // Handle error if needed
        }
      );
  }

  fetchReviews(productTitle: string): void {

    const url = `http://127.0.0.1:8000/api/reviewlist/${productTitle}/`;

    this.http.get<Review[]>(url).subscribe(
      (response) => {
        this.reviews = response;
        this.getCntByStars();
        console.log(this.reviews);
      },
      (error) => {
        console.error('Error fetching reviews:', error);
       } 
    );

    }

    getCntByStars() {
      for(const review of this.reviews){
        if(review.rating == 5){
          this.fiveStarCnt += 1
        }
        else if(review.rating == 4) {
          this.fourStarCnt += 1
        }
        else if(review.rating == 3) {
          this.threeStarCnt += 1
        }
        else if(review.rating == 2) {
          this.twoStarCnt += 1
        }
        else if(review.rating == 1) {
          this.oneStarCnt += 1
        }
      }
    }

  // submitReview() {
  //   this.newReview.productId = this.productId;
  //   this.newReview.rating = this.reviewForm.get('rating')?.value;
  //   this.newReview.content = this.reviewForm.get('content')?.value;
  //   this.apiService.loguser$.subscribe(user => {
  //     if (user) {
  //       this.newReview.userId = user.username;
  //     }
  //   });

  //   // this.newReview.userId = this.apiService.loguser$.
  //   this.prodApi.addReviewApi(this.newReview);
  // }

  submitReview(): void {
  
    if (this.reviewForm.invalid) {
      console.log("Review form is in valid")
      return;
    }

    const newReview: Review = {
      productTitle: this.productId,
      // author: this.reviewForm.get('author')?.value,
      rating: this.reviewForm.get('rating')?.value,
      comment: this.reviewForm.get('comment')?.value,
      author: this.uuname
     
    };
    this.newReview = newReview;
    const formData = new FormData();
    formData.append('productTitle', newReview.productTitle);
    formData.append('author', newReview.author);
    formData.append('rating', newReview.rating.toString());
    formData.append('comment', newReview.comment);



    
    


    this.http.post(`http://127.0.0.1:8000/api/review/`, formData).subscribe(

      (response: any) => {

        this.reviews.push(response);

      },

      (error) => {

        console.error('Error submitting review:', error);

      }
    );
    this.reviewForm.reset();
    this.getCntByStars();

  }

  getReviewCountByRating(rating: number): number {
    return this.reviews.filter(review => review.rating === rating).length;
  }

  getReviewPercentageByRating(rating: number): number {
    const count = this.getReviewCountByRating(rating);
    const totalCount = this.reviews.length;
    return (count / totalCount) * 100;
  }
  getBarFillWidth(rating: number): string {
    const reviewCount = this.getReviewCountByRating(rating);
    const totalReviews = this.reviews.length;
    const fillPercentage = (reviewCount / totalReviews) * 100;
    return fillPercentage + '%';
  }
  
  

  calculateAverageRating(): number {
    let totalRating = 0;
    for (const review of this.reviews) {
      totalRating += review.rating;
    }
    return totalRating > 0 ? Math.floor(totalRating / this.reviews.length) : 0;
  }

  totalReviews(): number {
    return this.reviews.length;
  }
  onSliderChange(event: any) {
    this.newReview.rating = event.value;
  }
  formatLabel(value: number): string {
    this.newReview.rating = value;
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return `${value}`;
  }

  // Inside the review component class

  selectedSortingOption: string = 'latest'; // Default sorting option

  sortReviews() {
    if (this.selectedSortingOption === 'latest') {
      // Sort reviews by latest
      // this.reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    } else if (this.selectedSortingOption === 'highest-rated') {
      // Sort reviews by highest-rated
      this.reviews.sort((a, b) => b.rating - a.rating);
    }
  }

  // Inside the review component class

  selectedRatingFilter: number | null = null; // Default rating filter (null for no filter)

  filterReviews() {
    if (this.selectedRatingFilter !== null) {
      // Filter reviews by selected rating
      this.reviews = this.reviews.filter(review => review.rating === this.selectedRatingFilter);
    }
  }




}
