import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  // {
  //   path: 'stocks',
  //   loadChildren: () => import('./pages/stocks/stocks.module').then(m => m.StocksPageModule)
  // },
  // {
  //   path: 'add-invoice',
  //   loadChildren: () => import('./pages/add-invoice/add-invoice.module').then(m => m.AddInvoicePageModule)
  // },

  // {
  //   path: 'add-item',
  //   loadChildren: () => import('./pages/add-item/add-item.module').then( m => m.AddItemPageModule)
  // },
  // {
  //   path: 'update-item',
  //   loadChildren: () => import('./pages/update-item/update-item.module').then( m => m.UpdateItemPageModule)
  // },
  //  {
  //   path: 'add-item-in-invoice',
  //   loadChildren: () => import('./pages/add-item-in-invoice/add-item-in-invoice.module').then( m => m.AddItemInInvoicePageModule)
  //  },
  // {
  //   path: 'customer-info',
  //   loadChildren: () => import('./pages/customer-info/customer-info.module').then( m => m.CustomerInfoPageModule)
  // },

  // {
  //   path: 'view-invoice-in-readonly',
  //   loadChildren: () => import('./pages/view-invoice-in-readonly/view-invoice-in-readonly.module')
  //.then( m => m.ViewInvoiceInReadonlyPageModule)
  // },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
