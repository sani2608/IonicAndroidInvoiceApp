import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/alert';
import { Cart, Customer} from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-item-in-invoice',
  templateUrl: './add-item-in-invoice.page.html',
  styleUrls: ['./add-item-in-invoice.page.scss'],
})
export class AddItemInInvoicePage implements OnInit {
  //TODO: replace this with actual Data.
  private _itemsInStock = [
    {
      itemId: 1,
      name: 'onion',
      price: 24,
      uom: 'kg'
    },
    {
      itemId: 2,
      name: 'potato',
      price: 30,
      uom: 'kg'
    },
    {
      itemId: 3,
      name: 'milk',
      price: 30,
      uom: 'Litre'
    },
    {
      itemId: 4,
      name: 'cabbage',
      price: 40,
      uom: 'kg'
    },
    {
      itemId: 5,
      name: 'rice',
      price: 100,
      uom: 'kg'
    },
  ];
  constructor(
    private alert: Alert,
    private dataService: DataService
  ) { }

  ngOnInit() {
      }


  cardClicked(itemId: number) {
    console.log('itemId which is going to be added in cart \n',itemId);
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
            if (quantityNumber <= 0 ) {
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
  public get itemsInStock() {
    // eslint-disable-next-line no-underscore-dangle
    return this._itemsInStock;
  }


  getItemsFromStock() {
    this.dataService.getItems();
  }

  addItemInInvoice(itemId: number, quantity: number, invoiceNumber: number){
    this.dataService.addItemInInvoice(itemId, quantity, invoiceNumber);
  }


}
