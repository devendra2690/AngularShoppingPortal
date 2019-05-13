import { Component, OnInit } from '@angular/core';
import { UserOperationService } from '../service/user/user-operation.service';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { DELETE_USER_DETAILS } from '../application-constant/application-constants';

@Component({
  selector: 'logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private userService: UserOperationService, private router: Router, private redux: NgRedux<ApplicationStore>) { }

  ngOnInit() {

    this.userService.logout();
    this.redux.dispatch({type: DELETE_USER_DETAILS});
    this.router.navigate(['/login']);
  }

}
