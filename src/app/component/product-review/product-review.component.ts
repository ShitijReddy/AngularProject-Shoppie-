import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/datainterface';
import { ApiService } from 'src/app/service/api.service';

import { ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-product-review',
  templateUrl: 'product-review.component.html',
  styleUrls: ['product-review.component.css']

})
export class ProductReviewComponent implements OnInit {
  
  @ViewChild(MatSlider)
  slider!: MatSlider;
  showReviewForm: boolean = false;
  showReviews: boolean = false;
  
  reviewForm!: FormGroup;

  @Input()
  productId!: string;
  reviews: Review[] = [];
  newReview: Review = {
    rating: 0, content: '', userId: '', productId: '',
    id: 0,
    createdAt: new Date
  };

  constructor(private http: HttpClient, private apiService: ApiService, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.loadReviews();
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  loadReviews() {
    this.http.get(`http://localhost:3000/reviews?productId=${this.productId}`)
      .subscribe(
        response => {
          this.reviews = response as Review[];
        },
        error => {
          console.error('Failed to fetch reviews:', error);
          // Handle error if needed
        }
      );
  }

  submitReview() {
    this.newReview.productId = this.productId;
    this.newReview.rating = this.reviewForm.get('rating')?.value;
    this.newReview.content = this.reviewForm.get('content')?.value;
    this.apiService.loguser$.subscribe(user => {
      if (user) {
        this.newReview.userId = user.username;
      }
    });

    // this.newReview.userId = this.apiService.loguser$.
    this.http.post('http://localhost:3000/reviews', this.newReview)
      .subscribe(
        response => {
          console.log('Review created successfully:', response);
          this.reviews.push(this.newReview);
          // Perform any necessary actions after successful creation
        },
        error => {
          console.error('Failed to create review:', error);
          // Handle error if needed
        }
      );
  }

  calculateAverageRating(): number {
    let totalRating = 0;
    for (const review of this.reviews) {
      totalRating += review.rating;
    }
    return totalRating > 0 ? totalRating / this.reviews.length : 0;
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
    this.reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  } else if (this.selectedSortingOption === 'highest-rated') {
    // Sort reviews by highest-rated
    this.reviews.sort((a, b) => b.rating - a.rating);
  } 
  // else if (this.selectedSortingOption === 'most-helpful') {
  //   // Sort reviews by most helpful (if you have a property for helpfulness, adjust accordingly)
  //   this.reviews.sort((a, b) => b.helpfulness - a.helpfulness);
  // }
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
