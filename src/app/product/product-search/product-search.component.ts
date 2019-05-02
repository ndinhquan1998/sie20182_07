import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';

import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'bwm-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.scss']
})
export class ProductSearchComponent implements OnInit {

  name: string;
  products: Product[] = [];
  errors: any[] = [];


  constructor(private route: ActivatedRoute,
              private productService: ProductService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.name = params['name'];
      this.getProducts();
    });
  }

  getProducts(){
    this.errors = [];
    this.products = [];

    this.productService.getProductsByName(this.name).subscribe(
      (products: Product[]) => {
          this.products = products;
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
      }
    );
  }

}
