import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddInvoicePageRoutingModule } from './add-invoice-routing.module';

import { AddInvoicePage } from './add-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddInvoicePageRoutingModule
  ],
  declarations: [AddInvoicePage]
})
export class AddInvoicePageModule {}
