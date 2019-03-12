import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';

import {ProductComponent} from './product.component';
import {ProductListComponent} from './product-list/product-list.component';
import {ProductListItemComponent} from './product-list-item/product-list-item.component';

import {ProductService} from './shared/product.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';

const routes: Routes = [
  { path: 'products',
  	 component: ProductComponent,
  	 children:[
  	 	{ path: '', component: ProductListComponent },
  	 	{ path: ':productId', component: ProductDetailComponent }
  	 ] },

  ]

@NgModule({
	declarations: [
	ProductComponent,
	ProductListComponent,
	ProductListItemComponent,
	ProductDetailComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes)],
	providers: [ProductService]
})

export class ProductModule{}