import { Component, OnInit, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ShoppingCart } from '../../../shoppingCart/shared/shoppingCart.model';

@Component({
  selector: 'bwm-manage-product-shoppingCart',
  templateUrl: './manage-product-shoppingCart.component.html',
  styleUrls: ['./manage-product-shoppingCart.component.scss']
})
export class ManageProductBookingComponent implements OnInit {

  @Input() shoppingCarts: ShoppingCart[];

  constructor(public modalService: NgbModal) { }

  ngOnInit() {
  }

}
