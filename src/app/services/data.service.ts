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
  isDatabasePresent() {
    //return boolean value if db is presesnt.
    //use BehaviorSubject bolean.
    //TODO implement isDatabasePresent
  }

  createDatabase() {
    //TODO implement createDatabase()
    // if isDatabasePresent returns false then create DATABASE.
  }

  //? Items Table
  isItemPresent(value: string): boolean {
    //TODO implement function to check if item is present in Database.
    console.log('will check if ' + value + ' is present in Database');
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

  getItems(): Observable<Item[]> {
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

  searchInvoices(invoice: string | number): Observable<Invoices[]> {
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
  addCustomer(value: Customer): void {
    //TODO addCustomer
  }

  addItemInInvoice(itemId: number, quantity: number): void {
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
