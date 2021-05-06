import { Component } from '@angular/core';
import { Invoices } from 'src/app/models/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  //TODO: replace this with actual data from database.
  invoices = [
    {
      customerName: 'John Doe',
      date: 'April 25, 2021',
      totalItems: 10,
      totalPrice: 1000,
      invoiceId: 1000,

    },
    {
      customerName: 'Soumya',
      date: 'April 25, 2021',
      totalItems: 15,
      totalPrice: 1200,
      invoiceId: 1001,
    },
    {
      customerName: 'Girish',
      date: 'April 30, 2021',
      totalItems: 20,
      totalPrice: 1500,
      invoiceId: 1002,
    },
    {
      customerName: 'Sanikumar',
      date: 'May 3, 2021',
      totalItems: 35,
      totalPrice: 5600,
      invoiceId: 1003,
    },
  ];

  constructor() { }
  clickStock() {
    console.log('Going to Stocks Page');
  }

  //* ALL THE FUNCTIONS TO BE IMPLEMENTED
  getAllInvoices(){
    //TODO: Implement getAllInvoice() function.
  }
  searchInvoice(){
    //TODO: Implement searchInvoice() function.
  }
}
