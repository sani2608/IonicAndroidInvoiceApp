/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cart } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { Alert } from 'src/app/shared/alert';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {
  private _flag = false;
  private _isStocksPageOrAddItemInInvoicePage: string;
  private invoiceId: number;


  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private alert: Alert,
  ) { }

  ngOnInit() {
    this.getStatusOfUrl();
    this.getAllItems();
    console.log('ngOnInit lifecycle inside Stocks');
  }

    /**
     * Getter _isStocksPageOrAddItemInInvoicePage @return {string}
     */
	public get isStocksPageOrAddItemInInvoicePage(): string {
		return this._isStocksPageOrAddItemInInvoicePage;
	}
  /** Getter itemsInStock used by template */
  public get flag() {
    return this._flag;
  }



  /** Getter itemsInStock used by template */
  public get itemsInStock() {
    return this.dataService.listOfItemsInStock;
  }


  public showAlertBox(itemId: number, itemPrice: number) {
    console.log('itemId which is going to be added in cart \n', itemId , itemPrice);
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
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (quantity: any) => {
          const quantityNumber = parseInt(quantity.quantity,10);
          const cartItem = new Cart();
          cartItem.invoiceId = this.invoiceId;
          cartItem.itemId = itemId;
          cartItem.quantity = quantityNumber;
          cartItem.buyPrice = itemPrice;
          this.addItemInInvoice(cartItem);
          this.getAllItemsInNewInvoice(this.invoiceId);
        }
      }
    ];
    const header = 'Enter Quantity';
    this.alert.presentAlertPrompt(
      header,
      inputObj,
      buttonObj,
    );
  }

  /**will add new item in the invoice */
  private addItemInInvoice(cartItem: Cart): void {
    this.dataService.addItemInNewInvoice(cartItem);
  }

  /** This will get all the items present in the stock from Database */
  private getAllItems() {
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getListOfItemsFromStock();
        }
      });
  }
  /** this function will check if the route if toupdate item or add new item*/
  private getStatusOfUrl(): void {
    this._isStocksPageOrAddItemInInvoicePage = this.route.snapshot.params.s;
    if (this._isStocksPageOrAddItemInInvoicePage === 's') {
      this._flag = true;
    } else {
      this.invoiceId = parseInt(this._isStocksPageOrAddItemInInvoicePage,10);
      console.log('invoice id is',this.invoiceId);
      this._flag = false;
    }
  }
  private getAllItemsInNewInvoice(invoiceId: number) {
    this.dataService.databaseState()
      .subscribe((response) => {
        console.log('getting items in new invoice .....\n', response)
        if (response) {
          this.dataService.getItemsFromNewInvoice(invoiceId);
        }
      });
  }
}
