import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import { flatMap, take } from 'rxjs/operators';

@Injectable()
export class IdTokenInterceptor implements HttpInterceptor {

  private token$: Observable<string>;

  constructor(private auth: AngularFireAuth) {
    this.token$ = auth.user
      .pipe(
        flatMap(user => from(user.getIdToken(true)))
      );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.token$.pipe(take(1), flatMap((token) => {
      console.log('intercepting stuff with token: ' + token);
      let newReq = req;
      if (token) {
        newReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
      return next.handle(newReq);
    }));
  }
}
