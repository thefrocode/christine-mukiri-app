import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Inject, Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { APP_CONFIG, AppConfig } from '../../app-config/app-config.token';
import { AuthCredentials, AuthenticatedUser } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  http = inject(HttpClient);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  login(credentials: AuthCredentials): Observable<AuthenticatedUser> {
    return this.http.post<AuthenticatedUser>(
      `${this.appConfig.baseURL}/login`,
      credentials
    );
  }
}
