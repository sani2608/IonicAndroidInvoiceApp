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

  private _date: Date = new Date();
  private _customerName = new Customer();
  private customerId: number;
  private _invoiceId: number;



  /**
   * Getter invoiceId @return {number}
   */
  public get invoiceId(): number {
    return this._invoiceId;
  }


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
  public createNewInvoice(customerName: Customer): void {
    this.dataService.addCustomer(customerName)
      .then(response => {
        this.customerId = response;
        console.log('Got CustomerId from Datbase After Inserting customer Name', this.customerId);
      })
      .then(() =>
        this.createInvoice(this.customerId)
      );
  }

  public deleteItemFromInvoice(itemId: number, invoiceNumber: number): void {
    this.dataService.deleteItemFromNewInvoice(itemId, invoiceNumber);
  }

  public createInvoice(customerId: number): void {
    this.dataService.createNewInvoice(customerId)
      .then((response) => {
        this._invoiceId = response;
        console.log('after creating new invoice', this._invoiceId);

      });
  }

  getInvoiceById() {
    this.dataService.getInvoiceById(this._invoiceId);
  }


  /**
   * @param delayTime is passed to function to open the alert after some delay.
   */
  public captureCustomerName(delayTime: number) {

    const inputObj = [
      {
        name: 'firstName',
        type: 'text',
        placeholder: 'first name',
        value: this._customerName.firstName,
      },
      {
        name: 'lastName',
        type: 'text',
        placeholder: 'last name',
        value: this._customerName.lastName,

      },
    ];
    const buttonObj = [
      {
        text: 'Submit',
        handler: (name: any) => {
          //console.log('Alert Submit Button Clicked');
          this.customerName.firstName = name.firstName;
          this.customerName.lastName = name.lastName;
          // console.log(this._customerName.fullName);
          this.createNewInvoice(this.customerName);
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

