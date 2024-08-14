import { HttpClient } from '@angular/common/http';
import { Injectable, inject, Inject } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { AuthStore } from '../../../auth/data-access/auth.store';
import { APP_CONFIG, AppConfig } from '../../app-config/app-config.token';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersApiService {
  http = inject(HttpClient);
  authStore = inject(AuthStore);

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {}

  loadUsers(): Observable<any> {
    return this.http.post<any>(`${this.appConfig.baseURL}/listAll`, {
      token: this.authStore.token(),
    });
  }
  addUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.appConfig.baseURL}/create`, {
      token: this.authStore.token(),
      payload: user,
    });
  }
  editUser(user: User): Observable<User> {
    return this.http.patch<User>(
      `${this.appConfig.baseURL}/users/${user.id}`,
      user
    );
  }
  deleteUser(id: number): Observable<User> {
    return this.http.delete<User>(`${this.appConfig.baseURL}/users/${id}`);
  }
}
