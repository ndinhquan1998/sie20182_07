import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import { ShoppingCart } from './shoppingCart.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BookingService{

	constructor(private http: HttpClient){}

	public createShoppingCart(booking: ShoppingCart): Observable<any>{
		return this.http.post('/api/v1/shoppingCarts', booking);
	}

	public getUserBookings(): Observable<any>{
		return this.http.get('/api/v1/shoppingCarts/manage');
	}

}