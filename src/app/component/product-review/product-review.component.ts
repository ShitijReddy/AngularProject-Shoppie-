import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from 'src/datainterface';
import { ApiService } from 'src/app/service/api.service';

import { ViewChild } from '@angular/core';
import { MatSlider, MatSliderChange } from '@angular/material/slider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';
@Component({
  selector: 'app-product-review',
  templateUrl: 'product-review.component.html',
  styleUrls: ['product-review.component.css']

})
export class ProductReviewComponent implements OnInit {
  @Output() dataShared = new EventEmitter<any>();

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
  newReview: Review = {
    rating: 0, content: '', userId: '', productId: '',
    id: 0,
    createdAt: new Date
  };

  constructor(private http: HttpClient, private apiService: ApiService, private formBuilder: FormBuilder,
              private prodApi: ProductApiService) {}

  ngOnInit() {
    this.loadReviews();
    this.reviewForm = this.formBuilder.group({
      rating: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  loadReviews() {
    this.http.get(`http://127.0.0.1:8000/api/reviews`)
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
    this.prodApi.addReviewApi(this.newReview);
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
    this.reviews.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
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
