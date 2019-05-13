import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginCheckGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const userObj: any = JSON.parse(localStorage.getItem('user'));

        if (userObj && userObj.username) {
            return true;
        }else{
            this.router.navigate(['/login']);
            return false;
        }
    }
}
