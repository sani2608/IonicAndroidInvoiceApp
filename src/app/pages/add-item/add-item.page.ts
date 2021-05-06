/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/data';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  private _itemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
  ) { }
  ngOnInit(): void {
    this._itemForm = this.formBuilder.group({
      name: ['onion', [Validators.required]],
      uom: ['kg', [Validators.required]],
      price: [50, [Validators.required]],
    });
  }
  get itemForm(): FormGroup {
    return this._itemForm;
  }

  addItem(value: Item): void {
    //TODO: Implement addItem() function.
    console.log('Implement addItem()');
    console.log(value);
    }
}
