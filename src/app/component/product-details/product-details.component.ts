import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxImageZoomComponent } from 'ngx-image-zoom';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ProductDetailsComponent>) {}

  zoomConfig = {
    zoomLevel: 1.5, // Zoom level
    enableZoom: true, // Enable/disable zoom functionality
    scrollZoom: false, // Enable/disable zoom on scroll
    zoomOnClick: true // Enable/disable zoom on click
  };


  imageUrl = 'data.image';

  closeDialog(): void {
    this.dialogRef.close();
  }
  // currentImage: string = this.selectedImage;

  selectedImage: string = this.data.image;
  myThumbnail = this.selectedImage;
  // ...
  // @ViewChild('zoomComponent') zoomComponent!: NgxImageZoomComponent;
  selectImage(image: string): void {
    this.selectedImage = image;
    this.myThumbnail = this.selectedImage;
    
    // this.zoomComponent.zoomImage(this.selectedImage);
  }
  getSelectedImage(){
    return this.selectedImage;
  }

  handleImageError(event: Event) {
    // Handle image loading error
    console.error('Error loading image:', event.target);
    // Optionally, you can set a fallback image or display an error message
  }
  imageLoaded(): void {
    // Image has finished loading, perform any necessary actions here
    console.log('Image loaded');
  }
  
  
}
