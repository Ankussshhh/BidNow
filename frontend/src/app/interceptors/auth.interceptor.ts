import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken');  // Get the token from localStorage

    if (token) {
      // Clone the request and add the Authorization header
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,  // Add token to the Authorization header
        },
      });

      return next.handle(clonedRequest);  // Pass the cloned request with the token
    }

    return next.handle(req);  // No token, pass the original request
  }
}
