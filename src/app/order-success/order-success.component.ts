import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { OrderCart } from '../bean/orderCart';
import { ProductService } from '../service/product/product.service';
import { IUser } from '../bean/user';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  @select() orderCart;
  totalPrice = 0;
  constructor(private redux: NgRedux<ApplicationStore>, private productService: ProductService) { }

  ngOnInit() {
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {

    const orderCartArray: OrderCart[] = JSON.parse(localStorage.getItem('orderCart'));
    orderCartArray.forEach((obj: OrderCart) => {

      this.totalPrice = this.totalPrice + obj.totalPrice;
    });
  }

  submitOrder() {

    const orderCartArray: OrderCart[] = JSON.parse(localStorage.getItem('orderCart'));
    const userObject: IUser = JSON.parse(localStorage.getItem('userObject'));

    const requestObj = '{"id":null,"orderDate":null,"orderNumber":null,"customerId":' + userObject.id + ',"products":' + JSON.stringify(orderCartArray) + '}';

    console.log(requestObj);

     this.productService.submitOrder(requestObj).subscribe((requestObj) => {


     });

  }
}
