import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';


import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';


import { ProductSearchComponent } from './product-search/product-search.component';



import { ProductService } from './shared/product.service';

import { HelperService } from '../common/service/helper.service';
import { UppercasePipe } from '../common/pipes/uppercase.pipe';

import { AuthGuard } from '../auth/shared/auth.guard';
import { ProductGuard } from './shared/product.guard';
import { FileUploadModule } from 'ng2-file-upload';

const routes: Routes = [
  { path: 'products',
  	 component: ProductComponent,
  	 children:[
		{ path: '', component: ProductListComponent },
		
		
		{ path: ':name/homes', component: ProductSearchComponent }
  	 ] },

  ]

@NgModule({
	declarations: [
	ProductComponent,
	ProductListComponent,
	ProductListItemComponent,
	
	UppercasePipe,
	
	ProductSearchComponent,
	
	
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		NgPipesModule,
		MapModule,
		Daterangepicker,
		FormsModule,
		ImageUploadModule,
		FileUploadModule
	],
	providers: [
		ProductService,
		HelperService,
		
		UcWordsPipe,
		ProductGuard
	]
})

export class ProductModule{}