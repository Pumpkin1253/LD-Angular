import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { SessionStorageService } from '../services/session-storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private sessionStorageService: SessionStorageService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const apiKey = this.sessionStorageService.getToken();
    
    const newRequest = request.clone({
      setHeaders:{
        'Content-Type':  'application/json',
        Authorization: apiKey
      },
    });

    return next.handle(newRequest);
  }
}
