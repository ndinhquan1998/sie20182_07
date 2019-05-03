import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';
import { UcWordsPipe } from 'ngx-pipes';

import { Subject } from 'rxjs';

@Component({
  selector: 'bwm-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit {
  product: Product;

  productCategories: string[] = Product.CATEGORIES;

  locationSubject: Subject<any> = new Subject();

  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private toastr:ToastrManager,
              private upperPipe: UcWordsPipe) { 
                this.transformLocation = this.transformLocation.bind(this);
              }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params) => {

  			this.getProduct(params['productId']);
  		}
  	)
  }

  transformLocation(location:string){
    return this.upperPipe.transform(location);
  }

  getProduct(productId: string){
  		this.productService.getProductById(productId).subscribe(
  			(product: Product) => {
  				this.product = product;
  			}
  		);
  }

  updateProduct(productId: string,productData: any){
    this.productService.updateProduct(productId, productData).subscribe(
      (updatedRental: Product) => {
          this.product = updatedRental;

          if(productData.name || productData.street){
            this.locationSubject.next(this.product.name + ', ' + this.product.street);
          }
      },
      (errorResponese: HttpErrorResponse) => {
            this.toastr.errorToastr(errorResponese.error.errors[0].detail,'Error!');
            this.getProduct(productId);
      }
    );
  }

  countBedroomAssets(assetsNum:number){
      return parseInt(<any>this.product.quantity || 0,10) + assetsNum;
  }
}
