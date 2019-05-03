import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgPipesModule } from 'ngx-pipes';

import { ManageProductBookingComponent } from './manage-product/manage-product-shoppingCart/manage-product-shoppingCart.component';
import { ManageComponent } from './manage.component';
import { ManageBookingComponent } from './manage-shoppingCart/manage-shoppingCart.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { FormatDatePipe } from '../common/pipes/format-date.pipe';
 
import { ProductService } from '../product/shared/product.service';
import { BookingService } from '../shoppingCart/shared/shoppingCart.service';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
    {
        path: 'manage',
        component: ManageComponent,
        children: [
            {path: 'products', component: ManageProductComponent /*, canActivate: [AuthGuard] */},
            {path: 'shoppingCarts', component: ManageBookingComponent /*, canActivate: [AuthGuard] */ },
        ]
        
    }
  
]

@NgModule({
  declarations: [
    ManageComponent,
    ManageBookingComponent,
    ManageProductComponent,
    FormatDatePipe,
    ManageProductBookingComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    NgPipesModule
  ],
  providers: [
    ProductService,
    BookingService
  ]
  
})
export class ManageModule { }
