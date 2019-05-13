import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { Router } from '@angular/router';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  @select(['userObject', 'name']) name;
  @select(['userObject', 'userRole']) role;
  @select() orderCartItmes;

  constructor(private ngRedux: NgRedux<ApplicationStore>, private router: Router) {

  }

  goToCart() {
    this.router.navigate(['/check-out']);
  }
}
