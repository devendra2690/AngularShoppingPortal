import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
  } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

  export class AddHeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      // Clone the request to add the new header
      const clonedRequest = req.clone({ headers: req.headers.append('Content-type', 'application/json').append('Access-Control-Allow-Origin', '*')});

      // Pass the cloned request instead of the original request to the next handle
      return next.handle(clonedRequest);
    }
  }
