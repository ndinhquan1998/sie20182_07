import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { Product } from './product.model';

@Injectable()
export class ProductService{
	
	private products: Product[] = [
		{
			id: "1",
			title: "Center Apartment",
			category: "apartment",
			image: "http://via.placeholder.com/350x250",
			quantity: 4,
			description: "Vetu nice apartment",
			rating: 34,
			createAt: "24/12/2017"
		},
		{
			id: "2",
			title: "Center Apartment",
			category: "apartment",
			image: "http://via.placeholder.com/350x250",
			quantity: 4,
			description: "Vetu nice apartment",
			rating: 34,
			createAt: "24/12/2017"
		},
		{
			id: "3",
			title: "Center Apartment",
			category: "apartment",
			image: "http://via.placeholder.com/350x250",
			quantity: 5,
			description: "Vetu nice apartment",
			rating: 34,
			createAt: "24/12/2017"
		},
		{
			id: "4",
			title: "Center Apartment",
			category: "apartment",
			image: "http://via.placeholder.com/350x250",
			quantity: 7,
			description: "Vetu nice apartment",
			rating: 34,
			createAt: "24/12/2017"
		},
	];

	public getProductById(productId: string): Observable<Product>{
		return new Observable<Product>((observer)=>{
			setTimeout(()=>{
				const foundProduct = this.products.find((product)=>{
					return product.id == productId;
				});

				observer.next(foundProduct);
			}, 500);
		});
	}

	public getProducts(): Observable<Product[]>{
		return new Observable<Product[]>((observer) =>{
			setTimeout(()=>{
				observer.next(this.products);
			},1000);

		});
	}
}