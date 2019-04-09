import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  newProduct: Product;
  productCategories = Product.CATEGORIES;
  errors: any[] = [];

  constructor(private productService: ProductService,
              private router:Router) { }

  ngOnInit() {
    this.newProduct = new Product();
    this.newProduct.shared = false;
  }

  handleImageChange(){
    this.newProduct.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  }

 /* handleImageUpload(imageUrl: string){
      this.newProduct.image = imageUrl;
  }

  handleImageError(){
      this.newProduct.image ='';
  } */

  createProduct(){
    this.productService.createProduct(this.newProduct).subscribe(
      (product:Product) => {
          this.router.navigate([`/products/${product._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
      }
    );
  }

}
