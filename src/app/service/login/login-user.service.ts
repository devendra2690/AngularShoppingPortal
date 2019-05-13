import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginUserService {

  constructor(private http: HttpClient) {  }

  /**
   *
   * This method give call to server and validate login credentials enetred by user.
   * @param user
   */
  validateUser(user) {

    return this.http.post('http://localhost:8080/authentication/validateUser', JSON.stringify(user))
      .map((response: Response) => response)
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    if (error.status === 400)
      return Observable.throw('400');

    if (error.status === 404)
      return Observable.throw('404');

    return Observable.throw('no status');
  }
}
