/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.page.html',
  styleUrls: ['./add-update-item.page.scss'],
})
export class AddUpdateItemPage implements OnInit {
  private _flag = false;
  private _itemForm: FormGroup;
  private _itemId: number;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,

  ) { }
  ngOnInit(): void {
    this.getStatusOfUrl();
    this.formData();
  }

  /** Getter itemForm used by template */
  public get flag(): boolean {
    return this._flag;
  }
  /** Getter itemForm used by template */
  public get itemForm(): FormGroup {
    return this._itemForm;
  }
  /** Getter itemId used by template*/
  public get itemId(): number {
    return this._itemId;
  }

  /**
   * @param item new item is passed to dataService
   */
  public addItem(item: Item): void {
    if (this.dataService.isItemPresentInStock(item.name)) {
      this.dataService.addItemInStock(item);
    } else {
      //TODO: implementation pending
    }
  }
  /**
   * @param item is the updated item
   * @param itemId is the itemId of the item
   */
  updateItem(item: Item, itemId: number): void {
    this.dataService.updateItemInStock(item, itemId);
  }

  /**ReactiveForm data */
  private formData(): void {
    this._itemForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      uom: ['', [Validators.required]],
      price: [0, [Validators.required]],
    });
  }
  /** this function will check if the route if to update item or add new item*/
  private getStatusOfUrl(): void {
    // eslint-disable-next-line radix
    const isUpdateOrAdd = parseInt(this.route.snapshot.params.id);
    if (isNaN(isUpdateOrAdd)) {
      this._flag = true;
    } else {
      this._flag = false;
      this._itemId = isUpdateOrAdd;
    }
  }
}
