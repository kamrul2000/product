import { Routes } from '@angular/router';
import { LoginComponent } from './login/login';
import { Products } from './products/products';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',   // 👈 default route → login
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'products',
    component: Products,
    canActivate: [authGuard]   // 👈 guarded route
  },
  {
    path: '**',
    redirectTo: 'login'   // fallback to login
  }
];
