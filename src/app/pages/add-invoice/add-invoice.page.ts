/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private alert: Alert,
    private toast: Toast,
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService) {
    route.params.subscribe(() => {
      this.getAllItemsInNewInvoice(this._invoiceId);
      this.calculateTotalPrice();
      console.log('from constructor of add new invoice\n',this.dataService.itemIdArray);
    });
  }

  ngOnInit() {
    console.log('ngOnInit Lifecycle ');
    this.captureCustomerName(1000);
  }

  /** Getter totalPrice @returns {totalPrice} */
  public get totalPrice(): number {
    return this._totalPrice;
  }

  /** Getter itemsAddedInNewInvoice @returns {items In New Invoice} */
  public get itemsAddedInNewInvoice() {
    return this._itemsAddedInNewInvoice;
  }

  /** Getter invoiceId @return {number} */
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

  /**
   * @param itemId is passed to delete item
   * @param invoiceId is passed to delete item
   */
  public deleteItemFromInvoice(itemId: number, invoiceId: number): void {
    console.log('deleteing item', itemId, invoiceId);
    this.dataService.deleteItemFromNewInvoice(itemId, invoiceId)
      .then(() => {
        this.toast.displayToast('Item Deleted Successfully', 'primary', 'bottom');
        this.getAllItemsInNewInvoice(this._invoiceId);
        this.dataService.itemIdArray = this.dataService.itemIdArray.filter((id) => id !== itemId);
      });
  }

  /** When user clicks on save button */
  public onClickSave(): void {
    this.dataService.getAllInvoices();
    this.toast.displayToast('Invoice Saved Successfully', 'primary', 'bottom');
    this.router.navigateByUrl('home');
    this.dataService.itemIdArray = [];
  }

  /**
   * @param delayTime is passed to function to open the alert after some delay.
   */
  public captureCustomerName(delayTime: number): void {

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
            this.toast.displayToast('first name cannot be blank', 'danger', 'top');
            this.captureCustomerName(100);
          } else {
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

  /**
   * @param invoiceId is passed to get all the items with invoiceId
   */
  private getAllItemsInNewInvoice(invoiceId: number): void {
    this.dataService.databaseState()
      .subscribe(res => {
        if (res) {
          this.dataService.getItemsFromNewInvoice(invoiceId)
            .then(responseArray => {
              this._itemsAddedInNewInvoice = responseArray;
              this.calculateTotalPrice();
            });
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
      .then(response =>   this.customerId = response)
      .then(() => this.createInvoice(this.customerId)
      );
  }

  /** @param customerId is passed to new Invoice */
  private createInvoice(customerId: number): void {
    this.dataService.createNewInvoice(customerId)
      .then((response) => this._invoiceId = response);
  }

  /** Calculates the total price of item in the invoice */
  private calculateTotalPrice(): void {
    this._totalPrice = this._itemsAddedInNewInvoice.reduce(
      (accumulator, currentValue) => accumulator + currentValue.totalPrice,
      0
    );
  }

}

