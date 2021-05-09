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
  itemsInCart = [
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
  constructor(
    private alert: Alert,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //run after 1 second delay.
    this.captureCustomerName(1000);
    this.createNewInvoice();
  }

  /**
   * @param delayTime is passed to function to open the alert after some delay.
   */
  captureCustomerName(delayTime: number) {
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
          handler: (value) => {
            console.log('Confirm Submit');
            console.log(value.firstName + ' ' + value.lastName);
          }
        }
      ];
      const header = 'Enter Customer Name';
    setTimeout(() => {
      this.alert.presentAlertPrompt(
        header,
        inputObj,
        buttonObj
      );
    }, delayTime);
  }

  /**
   * AS soon as the customer taps on Add new invoice, a new row is
   *  inserted in the table with just invoiceId and created Date.
   */
  createNewInvoice() {
    //as soon as the customer goes to add new Invoice page an, Invoice_no will be generated.
  }

  addCustomerToInvoice(customerName: Customer, invoiceNumber: Invoice): void {
    //?get value from the alert and pass it to service.
    //Here Only customerName will be passed because the invoiceId in automatically generated as it is a primary key
    this.dataService.addCustomerToInvoice(customerName, invoiceNumber);
  }

  deleteItemFromInvoice(itemId: number, invoiceNumber: number): void {
    this.dataService.deleteItemFromInvoice(itemId, invoiceNumber);
  }

}
