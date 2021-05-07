/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

  private _itemForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.formData();
  }
  get itemForm(): FormGroup {
    return this._itemForm;
  }
  formData() {
    this._itemForm = this.formBuilder.group({
      name: ['onion', [Validators.required]],
      uom: ['kg', [Validators.required]],
      price: [50, [Validators.required]],
    });
  }

  addItem(value: Item): void {
    //TODO: Implement addItem() function to check if item is already present in Db.
    if (this.dataService.isItemPresent(value.name)) {
      this.dataService.addItem(value);
    } else {
      //implement else function
    }
  }
}
