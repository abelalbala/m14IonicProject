import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'index',
    loadComponent: () => import('./pages/index/index.page').then( m => m.IndexPage)
  },
  {
    path: 'llistat',
    loadComponent: () => import('./pages/llistat/llistat.page').then( m => m.LlistatPage)
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./pages/detail/detail.page').then( m => m.DetailPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'carrito',
    loadComponent: () => import('./pages/carrito/carrito.page').then( m => m.CarritoPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'formulari',
    loadComponent: () => import('./pages/formulari/formulari.page').then( m => m.FormulariPage)
  },
];
