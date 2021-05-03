import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewInvoiceInReadonlyPageRoutingModule } from './view-invoice-in-readonly-routing.module';

import { ViewInvoiceInReadonlyPage } from './view-invoice-in-readonly.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewInvoiceInReadonlyPageRoutingModule
  ],
  declarations: [ViewInvoiceInReadonlyPage]
})
export class ViewInvoiceInReadonlyPageModule {}
