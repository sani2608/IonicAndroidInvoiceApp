/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UpdateItem } from 'src/app/models/data';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {
  private _updateForm: FormGroup;
  private _id: number;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.getItemById();
    //implement the form later
    this._updateForm = this.formBuilder.group({
      name: ['onion', [Validators.required]],
      uom: ['kg', [Validators.required]],
      price: [50, [Validators.required]],
    });
  }
  get updateForm(): FormGroup {
    return this._updateForm;
  }
  getItemById(): void {
    //*below line gets item id to update from the routerlink
    this._id = this.route.snapshot.params.id;
    console.log('item id =', this._id);
    //TODO implement getItemById()
    console.log('implement getItemById()');
  }
  updateItem(value: UpdateItem): void {
    //TODO: Implement updateItem()
    console.log('Implement UpdateItem()');
    console.log(value);
  }
}
