import { Routes } from '@angular/router';
import { LoginComponent } from './auth/feature/login/login.component';
import { AuthGuard } from './shared/utils/guards/auth.guard';
import { LayoutComponent } from './shell/feature/layout/layout.component';
import { UsersListComponent } from './users/feature/users-list/users-list.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard()],
    children: [
      {
        path: 'users',
        component: UsersListComponent,
      },
    ],
  },
];
