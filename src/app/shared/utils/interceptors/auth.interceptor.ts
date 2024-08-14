import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpInterceptorFn,
  HttpHandlerFn,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStore } from '../../../auth/data-access/auth.store';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const cloned = req.clone({
    setHeaders: {
      Authorization: `Basic Qm9tYVBvcnRhbENsaWVudDpjYmZiZDBhYi0yODc2LTQ0MmItYTNjOC04YWVkOTYzMmJhODM=`,
    },
  });
  return next(cloned);
};
