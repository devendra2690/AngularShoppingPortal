import { tassign } from 'tassign';
import { Product } from '../bean/product';
import { ADD_USER_DETAILS, DELETE_USER_DETAILS, ADD_PRODUCTS_DETAILS, ADD_CATEGORIES, ADD_ORDER_CART } from '../application-constant/application-constants';
import { Categories } from '../bean/categories';
import { OrderCart } from '../bean/orderCart';

export interface ApplicationStore {

    userObject: any;
    products: Product;
    categories: Categories;
    orderCart: OrderCart[];
    orderCartItmes: number;
}

export const APPLICATION_STORE_CONST: ApplicationStore = {
    userObject : JSON.parse(localStorage.getItem('user')),
    products : null,
    categories : null,
    orderCart : JSON.parse(localStorage.getItem('orderCart')),
    orderCartItmes : localStorage.getItem('orderCart') ? JSON.parse(localStorage.getItem('orderCart')).length : 0
};

export function reducer(state: ApplicationStore, action): ApplicationStore {

    switch (action.type) {

        case ADD_USER_DETAILS : return addUserDetails(state, action);
        case DELETE_USER_DETAILS : return tassign(state, {userObject: null});
        case ADD_PRODUCTS_DETAILS : return addProduct(state, action);
        case ADD_CATEGORIES : return addCategories(state, action);
        case ADD_ORDER_CART : return addToCart(state, action);

    }
    return state;
}

function addToCart(state: ApplicationStore, action) {

    localStorage.setItem('orderCart', JSON.stringify(action.orderCart));
    return tassign(state, {orderCart : action.orderCart, orderCartItmes : action.orderCart.length});
}

function addCategories(state: ApplicationStore, action) {

    localStorage.setItem('categories', JSON.stringify(action.categories));
    return tassign(state, {categories : action.categories});
}

function addUserDetails(state: ApplicationStore, action) {

    localStorage.setItem('userObject', JSON.stringify(action.userObject));
    return tassign(state, {userObject : action.userObject});
}

function addProduct(state: ApplicationStore, action) {

    localStorage.setItem('products', JSON.stringify(action.products));
    return tassign(state, {products : action.products});
}
