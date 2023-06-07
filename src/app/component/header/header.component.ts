import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProductApiService } from 'src/app/service/product-api.service';
import { v4 as uuidv4 } from 'uuid';
import { product } from 'src/datainterface';
import { ApiService } from 'src/app/service/api.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchControl: FormControl = new FormControl();
  products: any[] = [];

  // private prodComponent  = new ProductComponent();
  isCustomer : boolean = true;
  public totalItem : number = 0;
  public productList: any;
  public filteredProductList: any;
  public isSearched = true;
  public name1: string = "";
  showAutocomplete: boolean = false;
  autocompleteSuggestions: string[] = [];
  public hideAutoComplete : boolean = false;
  
  constructor(private shared: ApiService ,private cartService : CartService, 
    private prodApi: ProductApiService,private http: HttpClient,
    private router: Router, private authService: AuthService
    ) {}


  ngOnInit(): void {
    
    // using the service
    this.cartService.getProducts()
    .subscribe(res=> {
      this.totalItem = res.length;
    })
    console.log("This is filtered");
    console.log(this.productList);

    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => this.searchProducts(term))
      )
      .subscribe(products => {
        this.products = products;
      });
    
  }
  searchProducts(term: string) {
    // Replace the URL below with the actual URL of your JSON server
    const url = `http://localhost:3000/productList?prodName_like=${term}`;

    return this.http.get<any[]>(url);
  }

  searchProductForm = new FormGroup({
    searchBar: new FormControl('')
  })

  addProductForm = new FormGroup({
    prodName : new FormControl(''),
    prodDesc : new FormControl(''),
    image : new FormControl(''),
    price : new FormControl(''),
    quant : new FormControl(''),
    category : new FormControl('')

  })


  addProduct() {
    // console.log(this.addProductForm.value);
    let d : any = this.addProductForm.value;
    // d.id = uuidv4();
    this.prodApi.addProductApi(d)
    .subscribe((res)=> {
      console.log(res);
    })
  }

  searchProduct(text: string) {
    // RouterLink
    
    this.name1 = text;
    this.prodApi.getProductsApi()
    .subscribe(res=>{
      this.productList = res;
      

      // Filtering by text

      this.filteredProductList = this.productList.filter((item : product) => item.prodName.toLowerCase().includes(text.toLowerCase()));
      console.log(`The Filtered Products List ${this.filteredProductList}`)

      // setting data in shared
      this.shared.setData(this.filteredProductList);
      
      

    })
  }

  filterProducts(text: string) {
    this.filteredProductList = this.productList.filter((item : product) => item.prodName.toLowerCase().includes(text));
  }

  // onSearchInput() {
  //   const searchQuery = this.searchProductForm.value.searchBar.toLowerCase();
  //   this.autocompleteSuggestions = this.productList
  //     .filter(product => product.prodName.toLowerCase().includes(searchQuery))
  //     .map(product => product.prodName);
  //   this.showAutocomplete = this.autocompleteSuggestions.length > 0;
  // }

  selectSuggestion(suggestion: string) {
    this.searchProductForm.patchValue({ searchBar: suggestion });
    this.showAutocomplete = false;
  }


  changeSearchBarValue(productName : string){
    this.hideAutoComplete = true;
    this.searchProductForm.get('searchBar')?.setValue(productName);
    this.searchProduct(productName);
  }

  revertHideAutoComplete() {
    this.hideAutoComplete = false;
  }

  goToPage(route: string) {
    // Perform any additional logic if needed
    this.router.navigateByUrl(route);
  }

  logout() {
    this.authService.logout();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  updateIsCustomer() {
    this.shared.loguser$.subscribe(user => {
      if (user) {
        // Use the username as needed
        // console.log(`User role is -> ${user.role}`)
        if(user.role == "customer"){
          this.isCustomer = true;
          // return true;
        }
        else this.isCustomer = false;
        // return false;
      }
      // return false;
    });
    // return false;
  }

  getIsCustomer() {
    this.updateIsCustomer();
    return this.isCustomer;
  }
  

}
  