import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { CategoryService } from 'src/app/shared/category.service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [{ provide: CarouselConfig, useValue: { interval: 3000, noPause: true } }] // Optional: configure carousel options
})
export class HomeComponent implements OnInit {
  images = [
    "https://cdn.shopify.com/s/files/1/0491/4541/3794/products/CP02015MIC03U98_BAJA_A_540x.jpg?v=1683998370",
    "https://cdn.shopify.com/s/files/1/0491/4541/3794/products/0020526GND51N_BAJA_A_8f6dbd94-9562-456e-8f8a-3d7de15a4e3d_540x.jpg?v=1684756822",
    "https://cdn.shopify.com/s/files/1/0491/4541/3794/products/AXR2122AGD24R_BAJA_A_540x.jpg?v=1684008833",
    "https://m.media-amazon.com/images/I/71cFpnm0b6S._UX522_.jpg",
    "https://c1.wallpaperflare.com/preview/842/924/13/flat-lay-apple-watch-product.jpg"
  ];
  

  


  constructor(private router: Router, private categoryService: CategoryService) { }

  ngOnInit() {
  }

  redirectToProducts() {
    this.router.navigate(['/products']);
  }

  redirectToProductsAndFilter(cat:string): void {
    this.categoryService.setCategory(cat);
    this.router.navigate(['/products']);
  }
}
