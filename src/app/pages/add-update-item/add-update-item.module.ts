import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUpdateItemPageRoutingModule } from './add-update-item-routing.module';

import { AddUpdateItemPage } from './add-update-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddUpdateItemPageRoutingModule
  ],
  declarations: [AddUpdateItemPage]
})
export class AddUpdateItemPageModule {}
