import { inject } from '@angular/core';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { pipe, tap, switchMap, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { ToastrService } from 'ngx-toastr';
import { User, UsersState } from '../../shared/data-access/models/user';
import { UsersApiService } from '../../shared/data-access/api/users-api.service';

const initialState: UsersState = {
  users: [],
  status: 'pending',
  error: '',
};

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store: any,
      usersApi = inject(UsersApiService),
      toastr = inject(ToastrService)
    ) => ({
      loadUsers: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { status: 'loading' })),
          switchMap(() => {
            return usersApi.loadUsers().pipe(
              tapResponse({
                next: (users: any) => {
                  patchState(store, {
                    users: users.payload.content,
                    status: 'success',
                  });
                },
                error: (error: any) => {
                  patchState(store, {
                    status: 'error',
                    error: error.error.message,
                  });
                },
              })
            );
          })
        )
      ),
      addUser: rxMethod<User>(
        pipe(
          tap(() =>
            patchState(store, {
              status: 'loading',
            })
          ),
          switchMap((user) =>
            usersApi.addUser(user).pipe(
              tapResponse({
                next: (user: any) => {
                  patchState(store, {
                    status: 'success',
                    users: [...store.users(), user.payload],
                  });
                  toastr.success('User added successfully');
                },
                error: (error: any) => {
                  patchState(store, {
                    status: 'error',
                  });
                  toastr.error(error.error.message);
                },
              })
            )
          )
        )
      ),
      editUser: rxMethod<User>(
        pipe(
          tap(() =>
            patchState(store, {
              status: 'loading',
            })
          ),
          switchMap((user) =>
            usersApi.editUser(user).pipe(
              tapResponse({
                next: (user: any) => {
                  const userIndex = store
                    .users()
                    .findIndex((u: User) => u.usrId === user.id);
                  const users = [...store.users()];
                  users[userIndex] = user.payload;
                  patchState(store, {
                    users: users,
                  });
                  toastr.success('User edited successfully');
                },
                error: (error: any) => {
                  patchState(store, {
                    status: 'error',
                  });
                  toastr.error(error.error.message);
                },
              })
            )
          )
        )
      ),
      deleteUser: rxMethod<number>(
        pipe(
          tap(() =>
            patchState(store, {
              status: 'loading',
            })
          ),
          switchMap((user_id) =>
            usersApi.deleteUser(user_id).pipe(
              tapResponse({
                next: (user: User) => {
                  const userIndex = store
                    .users()
                    .findIndex((u: User) => u.usrId === user_id);
                  store.users().splice(userIndex, 1);
                  patchState(store, {
                    users: [...store.users()],
                  });
                  toastr.success('User deleted successfully');
                },
                error: (error: any) => {
                  patchState(store, {
                    status: 'error',
                  });
                  toastr.error(error.error.message);
                },
              })
            )
          )
        )
      ),
    })
  ),
  withHooks({
    onInit({ loadUsers }) {
      //loadUsers();
    },
  })
);
