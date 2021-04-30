import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'stocks',
    loadChildren: () => import('./pages/stocks/stocks.module').then(m => m.StocksPageModule)
  },
  {
    path: 'add-invoice',
    loadChildren: () => import('./pages/add-invoice/add-invoice.module').then(m => m.AddInvoicePageModule)
  },

  {
    path: 'add-item',
    loadChildren: () => import('./pages/add-item/add-item.module').then( m => m.AddItemPageModule)
  },
  {
    path: 'update-item',
    loadChildren: () => import('./pages/update-item/update-item.module').then( m => m.UpdateItemPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
