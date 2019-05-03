import { Product } from '../../product/shared/product.model';

export class ShoppingCart{

    static readonly DATE_FORMAT = 'Y/MM/DD'

    _id: string;
    startAt: string;
    endAt: string;
    totalPrice: number;
    guests: number;
    items: number;
    paymentToken: any;
    createdAt: string;
    product: Product;
}