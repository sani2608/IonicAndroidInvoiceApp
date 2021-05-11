/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Customer, Invoice } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { Alert } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.page.html',
  styleUrls: ['./add-invoice.page.scss'],
})
export class AddInvoicePage implements OnInit {
  //TODO: to be replace with real data.
  itemsAddedInInvoice = [
    {
      cartId: 100,
      name: 'Onion',
      quantity: 23,
      price: 20,
      uom: 'kg',
      totalPrice: 460,
    },
    {
      cartId: 101,
      name: 'Milk',
      quantity: 5,
      price: 30,
      uom: 'Litre',
      totalPrice: 150,
    },
    {
      cartId: 102,
      name: 'Cabbage',
      quantity: 10,
      price: 40,
      uom: 'kg',
      totalPrice: 400,
    },
  ];
  private _date: Date = new Date();
  private _customerName = new Customer();

  /**Getter date used by template */
  public get date(): Date {
    return this._date;
  }

  /** Getter customerName usedby Template */
  public get customerName(): Customer {
    return this._customerName;
  }

  constructor(
    private alert: Alert,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.captureCustomerName(1000);
    console.log('ngOnInit Lifecycle in add-new-invoice');
  }

  /**
   * @param date is the date when customer creates new invoice.
   * As soon as the customer clicks on add new invoice A new invoice number is generated,
   * and the customer is attached to that particular invoiceId.
   */
  public createNewInvoice(date: Date ): void{
    console.log('Generating new invoice Number');
  }

  public deleteItemFromInvoice(itemId: number, invoiceNumber: number): void {
    this.dataService.deleteItemFromNewInvoice(itemId, invoiceNumber);
  }

  public addCustomerToInvoice(customerName: Customer, invoiceNumber: number): void {
    //Here Only customerName will be passed because
    // the invoiceId is automatically generated as it is a primary key
    this.dataService.addCustomerInNewInvoice(customerName,invoiceNumber);
  }

  /**
   * @param delayTime is passed to function to open the alert after some delay.
   */
  private captureCustomerName(delayTime: number) {
    const inputObj = [
      {
        name: 'firstName',
        type: 'text',
        placeholder: 'sanikumar'
      },
      {
        name: 'lastName',
        type: 'text',
        placeholder: 'sahani'
      },
    ];
    const buttonObj = [
      {
        text: 'Submit',
        handler: (value: any) => {
          console.log('Confirm Submit');
          this.customerName.firstName = value.firstName;
          this.customerName.lastName = value.lastName;
          console.log(value.firstName + ' ' + value.lastName);
        }
      }
    ];
    const header = 'Enter Customer Name';
    setTimeout(async () => {
      await this.alert.presentAlertPrompt(
        header,
        inputObj,
        buttonObj
      );
    }, delayTime);
  }

}
