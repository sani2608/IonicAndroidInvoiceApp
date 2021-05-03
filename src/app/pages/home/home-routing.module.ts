import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: '',
    redirectTo: 'home',
    component: HomePage,
  },
  {
    path: 'stocks',
    loadChildren: () => import('../stocks/stocks.module').then(m => m.StocksPageModule)
  },
  // {
  //   path: 'customer-info',
  //   loadChildren: () => import('../customer-info/customer-info.module').then(m => m.CustomerInfoPageModule)
  // },
  {
    path: 'add-invoice',
    loadChildren: () => import('../add-invoice/add-invoice.module').then(m => m.AddInvoicePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
