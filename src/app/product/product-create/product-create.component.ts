import { Component, OnInit } from '@angular/core';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
import { FileUploader } from 'ng2-file-upload';

import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ImageUploadService } from 'src/app/common/components/image-upload/image-upload.service';

const URL = 'http://localhost:3001/api/v1/image-upload';

@Component({
  selector: 'bwm-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: true
  });

  newProduct: Product;
  selectedFile: any;
  productCategories = Product.CATEGORIES;
  errors: any[] = [];

  constructor(private productService: ProductService,
              private router:Router,
              private imageService: ImageUploadService) { }

  ngOnInit() {
    this.newProduct = new Product();
    this.newProduct.shared = false;
  }

 /* handleImageChange(){
    this.newProduct.image = "https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/13/image.jpeg";
  } */



  handleImageUpload(imageUrl: string){
      this.newProduct.image = imageUrl;
  }

  handleImageError(){
      this.newProduct.image ='';
  } 

 /* OnFileSelected(event) {
    const file: File = event[0];
  
    this.ReadAsBase64(file)
      .then(result => {
        this.selectedFile = result;
      })
      .catch(err => console.log(err));
  }
  
  Upload() {
    this.imageService.AddImage(this.selectedFile).subscribe(
      data => {
     //   this.socket.emit('refresh', {});
        const filePath = <HTMLInputElement>document.getElementById('filePath');
        filePath.value = '';
      },
      err => console.log(err)
    );

    this.newProduct.image = this.selectedFile;
  } 
  
  ReadAsBase64(file): Promise<any> {
    const reader = new FileReader();
    const fileValue = new Promise((resolve,reject) => {
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
  
      reader.addEventListener('error', event => {
        reject(event);
      });
  
      reader.readAsDataURL(file);
    });
  
    return fileValue;
  } */

  createProduct(){
    this.productService.createProduct(this.newProduct).subscribe(
      (product:Product) => {
          this.router.navigate([`/products/${product._id}`]);
      },
      (errorResponse: HttpErrorResponse) => {
          this.errors = errorResponse.error.errors;
      }
    );
  }

}
