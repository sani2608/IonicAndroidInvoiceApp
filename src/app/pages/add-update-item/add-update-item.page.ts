/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Item } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { Toast } from 'src/app/shared/toast';

@Component({
  selector: 'app-add-update-item',
  templateUrl: './add-update-item.page.html',
  styleUrls: ['./add-update-item.page.scss'],
})
export class AddUpdateItemPage implements OnInit {

  private _unitOfMeasuring: Array<string> = ['unit', 'kg', 'litre'];
  private _flag = false;
  private _itemForm: FormGroup;
  private _itemId: number;
  private isUpdateOrAdd: number;
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router,
    private toast: Toast
  ) { }
  ngOnInit(): void {
    this.getStatusOfUrl();
    this.formData();
  }

  /**
   * Getter _unitOfMeasuring @return {Array<string>}
   */
  public get unitOfMeasuring(): Array<string> {
    return this._unitOfMeasuring;
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
    this.dataService.addItemInStock(item)
      .then(() => {
        console.log(`${item.name} added successuflly`);
        this.toast.displayToast(`${item.name} added successfully`, 'primary','bottom');
        this.updateStockList();
        this.router.navigateByUrl('home/stocks');

      })
      .catch((e) => {
        console.log(item.name + ' is already present in the databse.',e);
        this.toast.displayToast(`${item.name} is already present in Cart `, 'danger','bottom');
      });
  }

  /**
   * @param item is the updated item
   * @param itemId is the itemId of the item
   */
  public updateItem(item: Item, itemId: number): void {
    this.dataService.updateItemInStock(item, itemId)
      .then(() => {
        this.toast.displayToast(`${item.name} Updated Successfully`, 'primary','bottom');
        this.updateStockList();
        this.router.navigateByUrl('home/stocks');
      }).catch(
        (e) => console.log('Got some error while updating item', e)
      );
  }
  /**
   * this function checks if request is to update item or to add item.
   */
  public submit(): void {
    if (isNaN(this.isUpdateOrAdd)) {
      this.addItem(this._itemForm.value);

    } else {
      this._flag = false;
      this.updateItem(this._itemForm.value, this._itemId);

    }
  }

  /**ReactiveForm data */
  private formData(name?: string, uom?: string, price?: number): void {
    this._itemForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      uom: [uom, [Validators.required]],
      price: [price, [Validators.required]],
    });
  }

  /** this function will check if the route if toupdate item or add new item*/
  private getStatusOfUrl(): void {
    this.isUpdateOrAdd = parseInt(this.route.snapshot.params.id, 10);
    if (isNaN(this.isUpdateOrAdd)) {
      this._flag = true;
    } else {
      this._flag = false;
      this._itemId = this.isUpdateOrAdd;
      this.getItemById(this._itemId);
    }
  }

  /**
   * @param itemId is pased to the database item with that id is fetched.
   */
  private getItemById(itemId: number): void {
    this.dataService.getItemByItemIdFromStock(itemId).then(
      (item) => {
        this.formData(item.name, item.uom, item.price);
      }
    );
  }
  /** update the stocklist as soon as item is added or updated. */
  private updateStockList() {
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getListOfItemsFromStock();
        }
      });
  }
}
