import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProductService{

	constructor(private http: HttpClient){}

	public getProductById(productId: string): Observable<any>{
		return this.http.get('/api/v1/products/' + productId);
	}

	public getProducts(): Observable<any>{
		return this.http.get('/api/v1/products');
	}

	public getProductsByName(name: string): Observable<any>{
		return this.http.get(`/api/v1/products?name=${name}`);
	}

	public getProductsByCategory(name: string): Observable<any>{
		return this.http.get(`/api/v1/products?category=${name}`);
	}

	public createProduct(product: Product):Observable<any>{
		return this.http.post('/api/v1/products', product);
	}

	public getUserProducts(): Observable<any>{
		return this.http.get('/api/v1/products/manage');
	}

	public deleteProduct(productId: string): Observable<any>{
		return this.http.delete(`/api/v1/products/${productId}`);
	}

	public updateProduct(productId: string, productData:any): Observable<any>{
		return this.http.patch(`/api/v1/products/${productId}`, productData);
	}

	public verifyProductUser(productId: string): Observable<any>{
		return this.http.get(`/api/v1/products/${productId}/verify-user`);
	}
}