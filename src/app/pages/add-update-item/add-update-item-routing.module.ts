import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddUpdateItemPage } from './add-update-item.page';

const routes: Routes = [
  {
    path: '',
    component: AddUpdateItemPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddUpdateItemPageRoutingModule {}
