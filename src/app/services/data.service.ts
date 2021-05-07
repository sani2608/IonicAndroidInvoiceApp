import { Injectable } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { Customer, Invoices, Item, ReadOnlyInvoice } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //? Database related functions.
  //1. check if the database is present.
  async isDatabasePresent(): Promise<boolean> {
    //return boolean value if db is presesnt.
    //use BehaviorSubject bolean.
    //TODO implement isDatabasePresent
    return false;
  }

  async createDatabase() {
    //TODO implement createDatabase()
    // if isDatabasePresent returns false then create DATABASE.
  }

  //? Items Table
  async isItemPresent(itemName: string): Promise<boolean> {
    //TODO implement function to check if item is present in Database.
    console.log('will check if ' + itemName + ' is present in Database');
    return true;
  }
  addItem(value: Item): void {
    //TODO: implement addItem function.
    console.log('addItem from dataService\n', value);
  }

  updateItem(value: Item): void {
    //TODO impmlement updateItem() function.
    console.log('updateItem from dataService\n', value);
  }

  getItems(): Promise<Item[]> {
    //TODO: implement getItems() function.
    //Use behavioural subject to pass latest item value.
    //gets items list from DATABASE.
    return;
  }

  //? HOME SECTION
  getInvoices(): Observable<Invoices[]> {
    //TODO: implement getInvoicesFromDB() function.
    return of([]);
  }

  searchInvoiceByCustomerName(customerName: string) {
    this.searchInvoices(customerName)
  }

  searchInvoiceByInvoiceNumber(invoiceNumber: number) {
    this.searchInvoices(invoiceNumber)
  }

  private searchInvoices(invoiceNumberOrCustomerName: string | number): Observable<Invoices[]> {
    //TODO implement searchInvoice
    console.log('from service search function\n', invoice);
    return of([]);;
  }

  //? READONLY PAGE
  getInvoicesInReadOnly(): Observable<ReadOnlyInvoice[]> {
    //TODO: implement getInvoicesFromDB() function.
    return of([]);
  }
  //? ADD NEW INVOICE
  addCustomerToInvoice(value: Customer, invoice: Invoice): void {
    //TODO addCustomer
  }

  addItemInInvoice(itemId: number, quantity: number, invoice: Invoice): void {
    //TODO addItemInInvoice
  }

  getItemsFromInvoice(): Observable<ReadOnlyInvoice[]> {
    //will get items that are added in the cart.
    //TODO: getItemsFromInvoice
    return of([]);
  }

  deleteItemFromInvoice(itemId: number): void{
    //TODO deleteItemFromInvoice
  }
}
