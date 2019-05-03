import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
 
@Component({
  selector: 'bwm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
	product: Product;

  constructor(private route: ActivatedRoute, private productService: ProductService) { }

  ngOnInit() {
  	this.route.params.subscribe(
  		(params) => {

  			this.getProduct(params['productId']);
  		}
  	)
  }

  getProduct(productId: string){
  		this.productService.getProductById(productId).subscribe(
  			(product: Product) => {
  				this.product = product;
  			}
  		);
  }

}
