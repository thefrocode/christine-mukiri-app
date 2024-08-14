import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { pipe, tap, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withStorageSync } from '@angular-architects/ngrx-toolkit';
import { tapResponse } from '@ngrx/operators';
import {
  AuthCredentials,
  AuthenticatedUser,
  AuthState,
} from '../../shared/data-access/models/user';
import { AuthApiService } from '../../shared/data-access/api/auth-api.service';
import { ToastrService } from 'ngx-toastr';

const initialState: AuthState = {
  user: undefined,
  status: 'pending',
  error: '',
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ user }) => ({
    isAuthenticated: computed(() => !!user()),
    token: computed(() => user()?.token),
  })),
  withStorageSync({
    key: 'auth',
    autoSync: true,
    select: (state) => {
      return { user: state.user };
    },
  }),
  withMethods(
    (
      store: any,
      authApi = inject(AuthApiService),
      toastr = inject(ToastrService)
    ) => ({
      logout: () => {
        patchState(store, initialState);
      },
      login: rxMethod<AuthCredentials>(
        pipe(
          tap(() => patchState(store, { status: 'authenticating' })),
          switchMap((credentials) =>
            authApi.login(credentials).pipe(
              tapResponse({
                next: (user: any) => {
                  patchState(store, {
                    user: user,
                    status: 'success',
                  });
                },
                error: (error: any) => {
                  toastr.error(error.error.message);
                  patchState(store, {
                    status: 'error',
                    error: error.error.message,
                  });
                },
              })
            )
          )
        )
      ),
    })
  )
);
