import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddInvoicePage } from './add-invoice.page';

const routes: Routes = [
  {
    path: '',
    component: AddInvoicePage
  },
  // {
  //   path: 'add-item-in-invoice',
  //   loadChildren: () => import('../add-item-in-invoice/add-item-in-invoice.module').then(m => m.AddItemInInvoicePageModule)
  // },
  {
    path: 'stocks/:s',
    loadChildren: () => import('../stocks/stocks.module').then(m => m.StocksPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddInvoicePageRoutingModule {}
