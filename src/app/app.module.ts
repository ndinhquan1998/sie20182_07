import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HeaderComponent} from './common/header.component';
import {ProductComponent} from './product/product.component';
import {ProductModule} from './product/product.module';

const routes: Routes = [
  {path: '', redirectTo: '/products',pathMatch:'full'},
  ]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,

  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    ProductModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
