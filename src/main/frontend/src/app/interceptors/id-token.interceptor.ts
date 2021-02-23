import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class IdTokenInterceptor implements HttpInterceptor {

  private token?: string;

  constructor(private auth: AngularFireAuth) {
    auth.user.subscribe((user) => {
      user.getIdToken().then(token => {
        this.token = token;
      });
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercepting stuff');
    let newReq = req;
    if (this.token) {
      newReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${this.token}`)
      });
    }
    return next.handle(newReq);
  }
}
