import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { OrderCart } from '../bean/orderCart';
import { ADD_ORDER_CART } from '../application-constant/application-constants';
import { IUser } from '../bean/user';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {

  @select() orderCart;
  totalPrice = 0;
  constructor(private redux: NgRedux<ApplicationStore>) { }

  ngOnInit() {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {

    const orderCartArray: OrderCart[] = JSON.parse(localStorage.getItem('orderCart'));

    orderCartArray.forEach((obj: OrderCart) => {

      this.totalPrice = this.totalPrice + obj.totalPrice;
    });
  }

  deleteFromCart(product: OrderCart) {

    const orderCartArray: OrderCart[] = JSON.parse(localStorage.getItem('orderCart'));
    this.totalPrice = 0;

    orderCartArray.forEach((obj: OrderCart, index: number) => {

       if (obj.title.toLowerCase() === product.title.toLowerCase() &&
           obj.category.toLowerCase() === product.category.toLowerCase()) {
            orderCartArray.splice(index, 1);
       }
    });

    this.redux.dispatch({type: ADD_ORDER_CART, orderCart: orderCartArray});
    this.calculateTotalPrice();
  }
}
