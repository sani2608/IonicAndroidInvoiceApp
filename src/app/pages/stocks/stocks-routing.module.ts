import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StocksPage } from './stocks.page';

const routes: Routes = [
  {
    path: '',
    component: StocksPage
  },
  {
    path: '',
    redirectTo: 'stocks',
    component: StocksPage
  },
  {
    path: 'add-item',
    loadChildren: () => import('../add-item/add-item.module').then(m => m.AddItemPageModule)
  },
  {
    path: 'update-item',
    loadChildren: () => import('../update-item/update-item.module').then(m => m.UpdateItemPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StocksPageRoutingModule {}
