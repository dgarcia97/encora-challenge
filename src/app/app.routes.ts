import { Routes } from '@angular/router';
import { isLoginGuard } from "./guards/is-login.guard";
import { isNotLoginGuard } from "./guards/is-not-login.guard";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'login', canActivate: [isNotLoginGuard],
    loadComponent: () => import('./login/login.component').then(mod => mod.LoginComponent) },
  { path: 'home', canActivate: [isLoginGuard],
    loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent) }
];
