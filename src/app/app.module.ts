import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ng6-toastr-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header.component';
import { ProductComponent } from './product/product.component';

import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { ManageModule } from './manage/manage.module';

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
    ProductModule,
    AuthModule,
    NgbModule.forRoot(),
    ToastrModule.forRoot(),
    BrowserAnimationsModule, 
    ManageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
