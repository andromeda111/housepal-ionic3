import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private authService: AuthService;

    // Would like to inject authService directly but it causes a cyclic dependency error
    // see https://github.com/angular/angular/issues/18224
    constructor(private injector: Injector) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.getAuthService().getToken()}`
            }       
        });

        return next.handle(req);
    }

    getAuthService(): AuthService {
        if (typeof this.authService === 'undefined') {
          this.authService = this.injector.get(AuthService);
        }
        return this.authService;
      }
}