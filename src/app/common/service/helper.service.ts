import { Injectable } from '@angular/core';
import { ShoppingCart } from '../../shoppingCart/shared/shoppingCart.model';
import * as moment from 'moment';

@Injectable()
export class HelperService{

    private getRangeOfDates(startAt, endAt, dateFormat){
        const tempDates = [];
        const mEndAt = moment(endAt);
        let mStartAt = moment(startAt);

        while(mStartAt < mEndAt){
            tempDates.push(mStartAt.format(dateFormat));
            mStartAt = mStartAt.add(1, 'day');
        }

        tempDates.push(moment(startAt).format(dateFormat));
        tempDates.push(mEndAt.format(dateFormat));

        return tempDates;
    }

    private formatDate(date, dateFormat){
        return moment(date).format(dateFormat);
    }

    public formatBookingDate(date){
        return this.formatDate(date, ShoppingCart.DATE_FORMAT);
    }


    public getBookingRangeOfDates(startAt, endAt){
        this.getRangeOfDates(startAt, endAt, ShoppingCart.DATE_FORMAT);
    }
}