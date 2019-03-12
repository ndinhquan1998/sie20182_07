import { Component, OnInit } from '@angular/core';
import {ProductService} from '../shared/product.service';
import { Product } from '../shared/product.model';

@Component({
  selector: 'bwm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

	products: Product[]  = [];

	testVariable: string = "";

  constructor(private rentalService: ProductService) { }

  ngOnInit() {

  const testNumber: number = 23;


  	const rentalObservable = this.rentalService.getProducts();

  	rentalObservable.subscribe(
  		(products:Product[])=>{
  			this.products = products;
  		},
  		(err)=>{

  		},
  		()=>{

  		}
  	);
  }

}
