import { Component, OnInit, Input, ViewContainerRef, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { ShoppingCart } from '../../../shoppingCart/shared/shoppingCart.model';
import { Product } from '../../shared/product.model';
import { BookingService } from '../../../shoppingCart/shared/shoppingCart.service';
import { HelperService } from '../../../common/service/helper.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { DaterangePickerComponent } from 'ng2-daterangepicker';
import { AuthService } from '../../../auth/shared/auth.service';
import * as moment from 'moment';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'bwm-product-detail-shoppingCart',
  templateUrl: './product-detail-shoppingCart.component.html',
  styleUrls: ['./product-detail-shoppingCart.component.scss']
})
export class ProductDetailBookingComponent implements OnInit {

  @Input() product: Product;
  @ViewChild(DaterangePickerComponent)
    private picker:DaterangePickerComponent;

 // @ViewChild('bookingNoteTitle')
   // private somePTag:ElementRef;

  newShoppingCart: ShoppingCart;
  modalRef: any;

  daterange: any = {};
  bookedOutDates: any[] = [];
  errors: any[] = [];

  constructor(private helper: HelperService, 
              private modalService: NgbModal,
              private bookingService: BookingService,
              private toastr: ToastrManager,
              private vcr:ViewContainerRef,
              public auth:AuthService) { 
        }

  ngOnInit() {
    this.newShoppingCart = new ShoppingCart();
//    this.getBookedOutDates();

   // this.somePTag.nativeElement.style.color = 'red';
  }

  options: any = {
      locale: { format: ShoppingCart.DATE_FORMAT },
      alwaysShowCalendars: false,
      opens: 'left',
      autoUpdateInput: false,
      isInvalidDate: this.checkForInvalidDates.bind(this)
  };

  private checkForInvalidDates(date){
      return this.bookedOutDates.includes(this.helper.formatBookingDate(date)) || date.diff(moment(), 'days') < 0;
  }

  private getBookedOutDates(){
    const shoppingCarts: ShoppingCart[] = this.product.shoppingCarts;

    if(shoppingCarts && shoppingCarts.length > 0){
      shoppingCarts.forEach((shoppingCart:ShoppingCart) => {
          const dateRange = this.helper.getBookingRangeOfDates(shoppingCart.startAt, shoppingCart.endAt);
          this.bookedOutDates.push(dateRange);
      });
    }
  }

  private addNewBookedDates(bookingData: any){
      const dateRange = this.helper.getBookingRangeOfDates(bookingData.startAt, bookingData.endAt);
      this.bookedOutDates.push(dateRange);
  }

  private resetDatePicker(){
    this.picker.datePicker.setStartDate(moment());
    this.picker.datePicker.setEndDate(moment());
    this.picker.datePicker.element.val('');
  }

  openConfirmModal(content){
    this.errors = [];
    this.modalRef = this.modalService.open(content);
  }

  onPaymentConfirmed(paymentToken: any){
    this.newShoppingCart.paymentToken = paymentToken;
  }

  createShoppingCart(){
    this.newShoppingCart.product = this.product;

    this.bookingService.createShoppingCart(this.newShoppingCart).subscribe(
      (shoppingCartData:any) => {
   //       this.addNewBookedDates(shoppingCartData);
   //       this.newShoppingCart = new ShoppingCart();
          this.modalRef.close();
   //       this.resetDatePicker();
          this.toastr.successToastr('Book has been successfully create, check you booking detail in manage section ', 'Success');
      },  
      (errorResponse: any) => {
          this.errors = errorResponse.error.errors;
      }
    );
  }

  selectedDate(value: any, datepicker?: any) {
      this.options.autoUpdateInput = true;
      this.newShoppingCart.startAt = this.helper.formatBookingDate(value.start);
      this.newShoppingCart.endAt = this.helper.formatBookingDate(value.end);
      this.newShoppingCart.items = -(value.start.diff(value.end, 'days'));
      this.newShoppingCart.totalPrice = this.newShoppingCart.items * this.product.price;
  }

  selectedItem(items) {
    this.newShoppingCart.totalPrice = items.target.value * this.product.price;
}

}
