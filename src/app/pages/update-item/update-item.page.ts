/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

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
    private route: ActivatedRoute,
    private dataService: DataService
  ) { }
  ngOnInit(): void {
    this.getItemById();
    this.formData();
  }
  get updateForm(): FormGroup {
    return this._updateForm;
  }
  formData() {
    //implement the form later
    this._updateForm = this.formBuilder.group({
      name: ['onion', [Validators.required]],
      uom: ['kg', [Validators.required]],
      price: [50, [Validators.required]],
    });
  }

  getItemById(): void {
    //*below line gets item id to update from the routerlink
    this._id = this.route.snapshot.params.id;
    console.log('item id =', this._id);
    //TODO implement getItemById()
    console.log('implement getItemById()');
  }

  updateItem(value: Item): void {
    //TODO: Implement updateItem()
    this.dataService.updateItem(value);
  }
}
