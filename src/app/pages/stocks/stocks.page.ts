/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  cardClicked(itemId: number) {
    console.log('itemId which is going to be added in cart \n', itemId);
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
          // eslint-disable-next-line radix
          const quantityNumber = parseInt(quantity.quantity);
          console.log(quantityNumber);
          if (quantityNumber <= 0) {
            console.log('Your validation message');
            return false;
          } else {
            //make HTTP call
          }
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
  public addItemInNewInvoice(itemId: number, quantity: number, invoiceNumber: number): void {
    this.dataService.addItemInNewInvoice(itemId, quantity, invoiceNumber);
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
      this._flag = false;
    }
  }
}
