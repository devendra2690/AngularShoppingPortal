import { Component, OnInit } from '@angular/core';
import { ProductService } from '../service/product/product.service';
import { Categories } from '../bean/categories';
import { NgRedux, select } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { ADD_CATEGORIES, ADD_ORDER_CART } from '../application-constant/application-constants';
import { Product } from '../bean/product';
import { OrderCart, OrderProduct } from '../bean/orderCart';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  categories: Categories[];
  products: Product[];
  filteredProducts: Product[];
  activeMenu: string;
  @select() orderCartStore: Product[];
  localStorageCart: Product[] = [];

  constructor(private producutService: ProductService, private ngRedux: NgRedux<ApplicationStore>) { }

  ngOnInit() {

    this.producutService.listAllCategories().subscribe((obj: Categories[]) => {
      if (obj) {
        this.categories = obj;
        this.ngRedux.dispatch({type: ADD_CATEGORIES, categories: this.categories});
      }else{

      }
    });

    this.producutService.fetchProductList().subscribe((obj: Product[]) => {
      if (obj) {
       this.filteredProducts = this.products = obj;
        this.ngRedux.dispatch({type: ADD_CATEGORIES, categories: this.categories});
      }else{

      }
    });

  }

  checkActiveClass(obj: HTMLInputElement) {
    if (this.activeMenu != undefined && this.activeMenu === obj.innerText) {
        return true;
    }

    // if(this.activeMenu) {
    //    return true;
    // }
  }

  loadAllCategories() {

    this.filteredProducts = this.products;
  }

  loadProducts(obj: HTMLInputElement) {

    this.activeMenu = obj.innerText;
    this.filteredProducts = this.products.filter((product: Product) => {
                            return product.category.toLowerCase().match(obj.innerText.toLowerCase());
                          });
  }

  addToCart(product: Product) {

    const orderCartArray = localStorage.getItem('orderCart') ? JSON.parse(localStorage.getItem('orderCart')) : null;
    let copyOrderCartArray;

    if (orderCartArray) {

      copyOrderCartArray = orderCartArray;
    }else{

      copyOrderCartArray = [];
    }

    const isProductExists: boolean = this.checkIfProductExists(product, copyOrderCartArray);

    if (isProductExists) {

      copyOrderCartArray.forEach((obj: OrderCart) => {

        if (obj.title.toLowerCase() === product.title.toLowerCase() &&
           obj.category.toLowerCase() === product.category.toLowerCase()) {

           obj.quantity = obj.quantity + 1;
           obj.totalPrice = obj.totalPrice + product.price;
           //obj.imageUrl = product.imageUrl;
        }
      });
    }else {

      const orderCartProduct: OrderProduct = new OrderProduct();
      orderCartProduct.title = product.title;
      orderCartProduct.category = product.category;
      orderCartProduct.totalPrice = product.price;
      //orderCartProduct.imageUrl = product.imageUrl;
      orderCartProduct.quantity = 1;

      copyOrderCartArray.splice(1, 0, orderCartProduct);
    }

    this.ngRedux.dispatch({type: ADD_ORDER_CART, orderCart: copyOrderCartArray});
  }

  checkIfProductExists(product: Product, orderCartArray: OrderCart[]) {

    let productExists = false;
    orderCartArray.forEach((obj: OrderCart) => {

      if (obj.title.toLowerCase() === product.title.toLowerCase() &&
          obj.category.toLowerCase() === product.category.toLowerCase()) {
          productExists = true;
      }
    });

    return productExists;
  }
}
