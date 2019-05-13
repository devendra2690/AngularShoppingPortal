import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgRedux, NgReduxModule} from 'ng2-redux';
import { DataTableModule} from 'angular-4-data-table';


import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { LoginUserService } from './service/login/login-user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AddHeaderInterceptor } from './interceptor/http-interceptor';
import { UserOperationService } from './service/user/user-operation.service';
import { LoginCheckGuard } from './activate_component/login_user_validate';
import { NoAccessComponent } from './no-access/no-access.component';
import { AdminUserValidate } from './activate_component/admin_user_validate';
import { LogoutComponent } from './logout/logout.component';
import { ApplicationStore, APPLICATION_STORE_CONST, reducer } from './shared_data/store';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ProductService } from './service/product/product.service';
import { EditProductComponent } from './admin/edit-product/edit-product.component';

//Angular loads a root AppComponent dynamically because it's listed by type in @NgModule.bootstrap.

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    NoAccessComponent,
    LogoutComponent,
    ProductFormComponent,
    EditProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    NgReduxModule,
    DataTableModule,
    NgbModule.forRoot(),
    RouterModule.forRoot([
      { path: '', component: HomeComponent, canActivate: [LoginCheckGuard]},
      { path: 'products', component: ProductsComponent, canActivate: [LoginCheckGuard] },
      { path: 'shopping-cart', component: ShoppingCartComponent, canActivate: [LoginCheckGuard] },
      { path: 'check-out', component: CheckOutComponent, canActivate: [LoginCheckGuard] },
      { path: 'order-success', component: OrderSuccessComponent, canActivate: [LoginCheckGuard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [LoginCheckGuard]},
      { path: 'login', component: LoginComponent },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [LoginCheckGuard, AdminUserValidate]},
      { path: 'admin/product/new', component: ProductFormComponent, canActivate: [LoginCheckGuard, AdminUserValidate]},
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [LoginCheckGuard, AdminUserValidate]},
      { path: 'no-access', component: NoAccessComponent, canActivate: [LoginCheckGuard]},
      { path: 'logout', component: LogoutComponent, canActivate: [LoginCheckGuard]},
      { path: 'admin/product/edit/:id', component: EditProductComponent, canActivate: [LoginCheckGuard, AdminUserValidate]}
    ])
  ],
  providers: [
      LoginUserService,
      UserOperationService,
      LoginCheckGuard,
      ProductService,
      AdminUserValidate,
      UserOperationService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: AddHeaderInterceptor,
        multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<ApplicationStore>){

    ngRedux.configureStore(reducer, APPLICATION_STORE_CONST);
  }
}
