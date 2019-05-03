import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../product/shared/product.service';
import { Product } from '../../product/shared/product.model';
import { ToastrManager } from 'ng6-toastr-notifications';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'bwm-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit {

  products: Product[];
  productDeleteIndex: number;

  constructor(private productService: ProductService,
             private toastr: ToastrManager) {}

  ngOnInit() {
    this.productService.getUserProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      () => {

      }
    )
  }

  deleteProduct(productId: string){
    this.productService.deleteProduct(productId).subscribe(
      () => {
          this.products.splice(this.productDeleteIndex, 1);
          this.productDeleteIndex = undefined;
      },
      (errorResponse: HttpErrorResponse) => {
        this.toastr.errorToastr(errorResponse.error.errors[0].detail, 'Failed!');
      }
    );
  }

}
