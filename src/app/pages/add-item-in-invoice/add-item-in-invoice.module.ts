import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemInInvoicePageRoutingModule } from './add-item-in-invoice-routing.module';

import { AddItemInInvoicePage } from './add-item-in-invoice.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddItemInInvoicePageRoutingModule
  ],
  declarations: [AddItemInInvoicePage]
})
export class AddItemInInvoicePageModule {}
