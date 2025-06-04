import { Routes } from '@angular/router';
import { authRoutes } from './pages/auth/routes';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent, NotFoundPageComponent } from './pages';
import { DefaultLayoutComponent, EmptyLayoutComponent } from './layouts';

const emptyLayoutRoutes: Routes = [
  ...authRoutes,
  {
    path: '**',
    component: NotFoundPageComponent,
  },
];

const defaultLayoutRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
];

export const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivateChild: [authGuard],
    canMatch: [authGuard],
    children: [...defaultLayoutRoutes],
  },
  {
    path: '',
    component: EmptyLayoutComponent,
    children: [...emptyLayoutRoutes],
  },
];
