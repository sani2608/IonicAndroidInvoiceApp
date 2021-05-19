/* eslint-disable no-underscore-dangle */
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Customer, ItemAddedInNewInvoice } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';
import { Alert } from 'src/app/shared/alert';
import { Toast } from 'src/app/shared/toast';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.page.html',
  styleUrls: ['./add-invoice.page.scss'],
})
export class AddInvoicePage implements OnInit {
  private _itemsAddedInNewInvoice: Array<ItemAddedInNewInvoice> = [];
  private _date: Date = new Date();
  private _customerName = new Customer();
  private customerId: number;
  private _invoiceId: number;
  private _totalPrice: number;

  public get totalPrice(): number {
    return this._totalPrice;
  }


  // public get itemsInStock() {
  //   return this.dataService.itemsAddedInNewInvoice;
  // }

  public get itemsAddedInNewInvoice() {
    return this._itemsAddedInNewInvoice;
  }

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
    private toast: Toast,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) {
    route.params.subscribe(val => {
      // put the code from `ngOnInit` here
      console.log('Inside Constructor of  add-new-invoice');
      this.getAllItemsInNewInvoice(this._invoiceId);
      this.getTotalPriceOfItemsInNewInvoice(this._invoiceId);
    });
    console.log('from add invoice constructor');
  }

  ngOnInit() {
    console.log('ngOnInit Lifecycle ');
    this.captureCustomerName(1000);
  }



  public deleteItemFromInvoice(itemId: number, invoiceNumber: number, index: number): void {
    console.log('deleteing item', itemId, invoiceNumber);
    this.dataService.deleteItemFromNewInvoice(itemId, invoiceNumber, index)
      .then(() => {
        this.getTotalPriceOfItemsInNewInvoice(this._invoiceId);
        this.getAllItemsInNewInvoice(this._invoiceId);
        this.toast.displayToast('Item Deleted Successfully', 'primary', 'bottom');
      });
  }




  public onClickSave() {
    this.dataService.getAllInvoices();
    this.toast.displayToast('Invoice Saved Successfully', 'primary', 'bottom');
    this.router.navigateByUrl('home');
  }


  /**
   * @param delayTime is passed to function to open the alert after some delay.
   */
  public captureCustomerName(delayTime: number) {

    const inputObj = [
      {
        name: 'firstName',
        type: 'text',
        placeholder: 'first name*',
      },
      {
        name: 'lastName',
        type: 'text',
        placeholder: 'last name',


      },
    ];
    const buttonObj = [
      {
        text: 'Submit',
        handler: (name: any) => {
          if (name.firstName == null || name.firstName.trim() === '') {
            console.log('first name is null');
            this.toast.displayToast('first name cannot be blank', 'danger', 'top');
            this.captureCustomerName(100);
          } else {
            console.log('submiting name');
            this.customerName.firstName = name.firstName.trim();
            this.customerName.lastName = name.lastName.trim();
            this.createNewInvoice(this.customerName);
          }
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
  private getAllItemsInNewInvoice(invoiceId: number): void {
    this.dataService.databaseState()
      .subscribe(res => {
        if (res) {
          this.dataService.getItemsFromNewInvoice(invoiceId)
            .then(responseArray => {
              this._itemsAddedInNewInvoice = responseArray;
              console.log('got all the items from new invoice', this._itemsAddedInNewInvoice);
            }
            );
        }
      });
  }

  /**
   * @param date is the date when customer creates new invoice.
   * As soon as the customer clicks on add new invoice A new invoice number is generated,
   * and the customer is attached to that particular invoiceId.
   */
  private createNewInvoice(customerName: Customer): void {
    this.dataService.addCustomer(customerName)
      .then(response => {
        this.customerId = response;
        console.log('Got CustomerId from Datbase After Inserting customer Name', this.customerId);
      })
      .then(() =>
        this.createInvoice(this.customerId)
      );
  }

  private createInvoice(customerId: number): void {
    this.dataService.createNewInvoice(customerId)
      .then((response) => {
        this._invoiceId = response;
        console.log('After Creating New Invoice got InvoiceId = ', this._invoiceId);
      });
  }

  private getTotalPriceOfItemsInNewInvoice(invoiceId: number) {
    this.dataService.getTotalPriceOfInvoice(invoiceId).then((res) => this._totalPrice = res);
  }
}

