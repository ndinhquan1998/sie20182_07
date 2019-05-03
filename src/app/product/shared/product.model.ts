import { ShoppingCart } from '../../shoppingCart/shared/shoppingCart.model';

export class Product{

	static readonly CATEGORIES = ["Arts", "Automotive", "Books", "Computers",
								  "Digital Music", "Electronics","Kindle Store", "Prime Video", 
								  "Fashion", "Household", "Scientific", 
								  "Movie", "CD", "Software", "Video Games", "Sports"];

	_id: string;
	name: string;
	street: string;
	category: string;
	image: string;
	quantity: number;
	description: string;
	price: number;
	shared: boolean;
	createAt: string;
	shoppingCarts: ShoppingCart[];
}