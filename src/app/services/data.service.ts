import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Customer, Invoice, Invoices, Item, ReadOnlyInvoice } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //? Database related functions.
  async isDatabasePresent(): Promise<boolean> {
    //return boolean value if db is presesnt.
    return false;
  }

  async createDatabase() {
    // if isDatabasePresent returns false then create DATABASE.
  }

  //? Items Table
  async isItemPresent(itemName: string): Promise<boolean> {
    console.log('will check if ' + itemName + ' is present in Database');
    return true;
  }

  async addItem(item: Item): Promise<any> {
    console.log('addIem from dataService\n', item);
  }

  async updateItem(item: Item, itemId: number): Promise<any> {
    console.log('updateItem from dataService\n', item, itemId);
  }

  /**
   *
   * @param itemId is the itemId of the item
   * @returns item
   */
  async getItemByItemId(itemId: number): Promise<Item[]> {
    //gets items list from DATABASE.
    console.log('from dataservice', itemId);
    return;
  }

  /**
   * @returns list of items present in the stock.
   */
  async getItems(): Promise<Item[]> {
    //gets items list from DATABASE.
    return;
  }



  //? HOME SECTION
  async getInvoices(): Promise<Invoices[]> {
    return;
  }

  async searchInvoiceByCustomerName(customerName: string): Promise<any> {
    console.log('from search by name function\n', customerName);
  }

  async searchInvoiceByInvoiceNumber(invoiceNumber: number): Promise<any> {
    console.log('from search by invoiceNumber \n', invoiceNumber);
  }

  //? READONLY PAGE
  async getInvoicesInReadOnly(): Promise<ReadOnlyInvoice[]> {
    return;
  }
  //? ADD NEW INVOICE
  async addCustomerToInvoice(customerName: Customer, invoice: Invoice): Promise<any> {
    return;
  }

  async addItemInInvoice(itemId: number, quantity: number, invoice: number): Promise<any> {
    return;
  }

  async getItemsFromInvoice(): Promise<ReadOnlyInvoice[]> {
    //will get items that are added in the cart.
    return;
  }

  async deleteItemFromInvoice(itemId: number, invoiceNumber: number): Promise<any> {
    return;
  }
}
