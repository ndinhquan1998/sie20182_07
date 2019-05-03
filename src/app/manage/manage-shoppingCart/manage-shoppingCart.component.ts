import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../shoppingCart/shared/shoppingCart.service';
import { PaymentService } from '../../payment/shared/payment.service';

import { ShoppingCart } from '../../shoppingCart/shared/shoppingCart.model';
 
@Component({
  selector: 'bwm-manage-shoppingCart',
  templateUrl: './manage-shoppingCart.component.html',
  styleUrls: ['./manage-shoppingCart.component.scss']
})
export class ManageBookingComponent implements OnInit {

  shoppingCarts: ShoppingCart[] ;
  payments: any[];

  constructor(private rentalService: BookingService,
              private paymentService: PaymentService) { }

  ngOnInit() {
    this.rentalService.getUserBookings().subscribe(
      (shoppingCarts: ShoppingCart[]) => {
        this.shoppingCarts = shoppingCarts;
      },
      () => {

      }
    )

    this.getPendingPayments();
  }

  getPendingPayments(){
    this.paymentService.getPendingPayments().subscribe(
      (payments: any) => {
          this.payments = payments;
      },
      () => {

      }
    );
  }

  acceptPayment(payment){
      this.paymentService.acceptPayment(payment).subscribe(
        (json) => {
          payment.status ='paid';
        },
        err => {

        }
      )
  }

  declinePayment(payment){
    this.paymentService.declinePayment(payment).subscribe(
      (json) => {
          payment.status ='declined';
      },
      err => {
          
      }
    )
}

}
