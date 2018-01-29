import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import  {Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private authService: AuthService;

    // Would like to inject authService directly but it causes a cyclic dependency error
    // see https://github.com/angular/angular/issues/18224
    constructor(private injector: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!this.getAuthService().isAuthenticated) {
            return next.handle(req);
        }

        let token: string = this.getAuthService().getUserToken;
        console.log('Auth Intercept ', token);
        
        if (token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }       
            });
            return next.handle(req);
        } else {
            // Catch Case: Token Undefined, login somehow in bad state and user needs to sign in again.
            alert('Please Sign Out and Sign In Again.')
            this.getAuthService().logout();
            return next.handle(req);
        }
    }

    getAuthService(): AuthService {
        if (typeof this.authService === 'undefined') {
          this.authService = this.injector.get(AuthService);
        }
        return this.authService;
      }
}