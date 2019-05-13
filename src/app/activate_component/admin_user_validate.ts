import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class AdminUserValidate implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const userObj: any = JSON.parse(localStorage.getItem('user'));

        if (userObj.userRole == 'ADMIN') {
            return true;
        }else{
            this.router.navigate(['/no-access']);
            return false;
        }
    }
}
