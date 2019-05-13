import { Injectable } from '@angular/core';

@Injectable()
export class UserOperationService {

  constructor() { }

  logout() {
    localStorage.removeItem('user');
  }

  getUsername() {

     const userObj: any = localStorage.getItem('user');
     return userObj ? userObj.username : 'username';
  }
}
