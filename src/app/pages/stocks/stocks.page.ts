/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Cart, Item } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { Alert } from 'src/app/shared/alert';
import { Toast } from 'src/app/shared/toast';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {
  private _itemsInStockArrayForInvoicePage: Array<Item> = [];
  private _listOfItemsInStock: Array<Item> = [];
  private _flag = false;
  private _isStocksPageOrAddItemInInvoicePage: string;
  private invoiceId: number;
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private alert: Alert,
    private toast: Toast,
    public navCtrl: NavController) {
    route.params.subscribe(() => this.getAllItems());
  }

  ngOnInit() {
    this.getStatusOfUrl();
  }

  /**
   * Getter _isStocksPageOrAddItemInInvoicePage @return {string}
   */
  public get isStocksPageOrAddItemInInvoicePage(): string {
    return this._isStocksPageOrAddItemInInvoicePage;
  }

  /**
   * Getter listOfItemsInStock @return {Array<Item>}
   */
  public get itemsInStock(): Array<Item> {
    return this._listOfItemsInStock;
  }


  /**
   * Getter $itemsInStockArrayForInvoicePage @return {Array<number> }
   */
  public get itemsInStockArrayForInvoicePage(): Array<Item> {
    return this._itemsInStockArrayForInvoicePage;
  }


  /** Getter itemsInStock used by template */
  public get flag() {
    return this._flag;
  }

  public showAlertBox(itemId: number, itemPrice: number, uom: string, i: number, itemName: string) {
    const inputObj = [
      {
        name: 'quantity',
        type: 'number',
        placeholder: '00'
      },
    ];
    const buttonObj = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Ok',
        handler: (quantity: any) => {
          const quantityNumber = parseInt(quantity.quantity, 10);
          if (isNaN(quantityNumber)) {
            this.toast.displayToast('quantity cannot be 0', 'danger', 'top');
            this.showAlertBox(itemId, itemPrice, uom, i, itemName);
          } else {
            const cartItem = new Cart();
            cartItem.invoiceId = this.invoiceId;
            cartItem.itemId = itemId;
            cartItem.quantity = quantityNumber;
            cartItem.buyPrice = itemPrice;
            this.addItemInInvoice(cartItem);
            this._itemsInStockArrayForInvoicePage.splice(i, 1);
            this.isItemAddedToInvoice(itemName, itemId);
          }
        }
      }
    ];
    const header = `Enter Quantity in ${uom}`;
    this.alert.presentAlertPrompt(
      header,
      inputObj,
      buttonObj,
    );
  }

  /** @param itemName will be displayed if item is added to invoice */
  private isItemAddedToInvoice(itemName: string, itemId: number): void {
    if (this._itemsInStockArrayForInvoicePage.length === 0) {
      this.dataService.itemIdArray.push(itemId);
      this.navCtrl.back();
      this.toast.displayToast('All items are added to invoice ', 'primary', 'top');
    } else {
      this.toast.displayToast(`${itemName} added to Invoice`, 'primary', 'bottom');
      this.dataService.itemIdArray.push(itemId);
    }
  }

  /**will add new item in the invoice */
  private addItemInInvoice(cartItem: Cart): void {
    this.dataService.addItemInNewInvoice(cartItem);
  }

  /** This will get all the items present in the stock from Database */
  private getAllItems(): void {
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getListOfItemsFromStock().then(
            responseArray => {
              this._listOfItemsInStock = responseArray;
              this._itemsInStockArrayForInvoicePage = responseArray.filter((item) => !this.dataService.itemIdArray.includes(item.itemId));
            }
          );
        }
      });
  }

  /** this function will check if the route if to update item or add new item*/
  private getStatusOfUrl(): void {
    this._isStocksPageOrAddItemInInvoicePage = this.route.snapshot.params.s;
    if (this._isStocksPageOrAddItemInInvoicePage === 's') {
      this._flag = true;
    } else {
      this.invoiceId = parseInt(this._isStocksPageOrAddItemInInvoicePage, 10);
      this._flag = false;
    }
  }

}
