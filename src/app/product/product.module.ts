import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule, UcWordsPipe } from 'ngx-pipes';
import { MapModule } from '../common/map/map.module';
import { Daterangepicker } from 'ng2-daterangepicker';
import { FormsModule } from '@angular/forms';
import { EditableModule } from '../common/components/editable/editable.module';
import { ImageUploadModule } from '../common/components/image-upload/image-upload.module';
import { PaymentModule } from '../payment/payment.module';

import { ProductComponent } from './product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductListItemComponent } from './product-list-item/product-list-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductDetailBookingComponent } from './product-detail/product-detail-shoppingCart/product-detail-shoppingCart.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

import { ProductService } from './shared/product.service';
import { BookingService } from '../shoppingCart/shared/shoppingCart.service';
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
		{ path: 'new', component: ProductCreateComponent },
		{ path: ':productId/edit', component: ProductUpdateComponent, canActivate: [AuthGuard, ProductGuard] },
		{ path: ':productId', component: ProductDetailComponent,/*canActivate: [AuthGuard] */},
		{ path: ':name/homes', component: ProductSearchComponent }
  	 ] },

  ]

@NgModule({
	declarations: [
	ProductComponent,
	ProductListComponent,
	ProductListItemComponent,
	ProductDetailComponent,
	UppercasePipe,
	ProductDetailBookingComponent,
	ProductSearchComponent,
	ProductCreateComponent,
	ProductUpdateComponent
	],
	imports: [
		CommonModule,
		RouterModule.forChild(routes),
		HttpClientModule,
		NgPipesModule,
		MapModule,
		Daterangepicker,
		FormsModule,
		EditableModule, 
		ImageUploadModule,
		PaymentModule,
		FileUploadModule
	],
	providers: [
		ProductService,
		HelperService,
		BookingService,
		UcWordsPipe,
		ProductGuard
	]
})

export class ProductModule{}