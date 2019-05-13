import { Component } from '@angular/core';
import { LoginUserService } from '../service/login/login-user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserFormValidator } from '../validators/userformvalidator';
import { Route, Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { ApplicationStore } from '../shared_data/store';
import { Observable } from 'rxjs/Observable';
import { IUser } from '../bean/user';
import { ADD_USER_DETAILS } from '../application-constant/application-constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm = new FormGroup({
      emailid: new FormControl('', [Validators.required, Validators.email, UserFormValidator.emailAddressDomainName]),
      password: new FormControl('', [Validators.required])
  });

  userObj;


  constructor(private loginService: LoginUserService, private route: Router, private ngRedux: NgRedux<ApplicationStore>) {
  }


  login() {

        this.loginService.validateUser(this.loginForm.value).subscribe((obj: IUser[] ) => {

        this.userObj = obj;
        if (this.userObj.username) {
            localStorage.setItem('user', JSON.stringify(this.userObj));
            this.ngRedux.dispatch({type: ADD_USER_DETAILS, userObject: obj});
            this.route.navigate(['']);
        }else{

          this.loginForm.setErrors({'invalid_login': 'UserName/Password Combination is incorrect.'});
        }
      });
    }


}
