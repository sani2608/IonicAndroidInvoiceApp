/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Customer, Invoice, Invoices, Item, ItemAddedInNewInvoice, ReadOnlyInvoice } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //? Private variables to store data.
  /** this variable will store all the items present in the stock */
  private _listOfItemsInStock: Array<Item[]> = [];
  /**this will store all the invoice to show on homepage */
  private _homePageInvoiceList: Array<Invoice[]> = [];
  /** This will store the items that are added in stock while creating new invoice */
  private _itemsAddedInNewInvoice: Array<ItemAddedInNewInvoice[]> = [];
  /** This will store the ready only invoice details */
  private _readOnlyInvoiceDetails: ReadOnlyInvoice;

  //? Getters and Setters for private variables
  /** Getter listOfItemsInStock */
  public get listOfItemsInStock(): Array<Item[]> {
    return this._listOfItemsInStock;
  }

  /**Getter homePageInvoiceList */
  public get homePageInvoiceList(): Array<Invoice[]> {
    return this._homePageInvoiceList;
  }

  /** Getter itemsAddedInNewInvoice */
  public get itemsAddedInNewInvoice(): Array<ItemAddedInNewInvoice[]> {
    return this._itemsAddedInNewInvoice;
  }

  /** Getter readOnlyInvoiceDetails */
  public get readOnlyInvoiceDetails(): ReadOnlyInvoice {
    return this._readOnlyInvoiceDetails;
  }

  //? DATABASE RELATED FUNCTIONS
  async isDatabasePresent(): Promise<boolean> {
    //return boolean value if db is presesnt.
    return false;
  }

  async createDatabase(): Promise<void> {
    // if isDatabasePresent returns false then create DATABASE.
  }

  //? ITEMS TABLE RELATED FUNCTIONS
  async isItemPresentInStock(itemName: string): Promise<boolean> {
    console.log('will check if ' + itemName + ' is present in Database');
    return true;
  }

  async addItemInStock(item: Item): Promise<void> {
    console.log('addIem from dataService\n', item);
  }

  async updateItemInStock(item: Item, itemId: number): Promise<void> {
    console.log('updateItem from dataService\n', item, itemId);
  }

  /**
   * @param itemId is the itemId of the item
   * @returns item
   */
  async getItemByItemIdFromStock(itemId: number): Promise<Item[]> {
    console.log('from dataservice', itemId);
    return;
  }

  /**
   * @returns list of items present in the stock */
  async getListOfItemsFromStock(): Promise<Item[]> {
    //gets items list from DATABASE.
    return;
  }

  //? HOME SECTION RELATED FUNCTION
  async getAllInvoices(): Promise<Invoices[]> {
    return;
  }

  async searchInvoiceByCustomerName(customerName: string): Promise<ReadOnlyInvoice> {
    console.log('from search by name function\n', customerName);
    return;
  }

  async searchInvoiceByInvoiceNumber(invoiceNumber: number): Promise<ReadOnlyInvoice> {
    console.log('from search by invoiceNumber \n', invoiceNumber);
    return;
  }


  //? READONLY PAGE RELATED FUNCTIONS
  async getInvoiceDetailsByInvoiceId(invoiceId: number): Promise<ReadOnlyInvoice> {
    return;
  }

  //? NEW INVOICE PAGE RELATED FUNCTIONS
  async createNewInvoice(date: Date): Promise<void> {
    return;
  }

  async addCustomerInNewInvoice(customerName: Customer, invoiceNumber: number): Promise<void> {
    return;
  }

  async addItemInNewInvoice(itemId: number, quantity: number, invoice: number): Promise<void> {
    return;
  }

  async getItemsFromNewInvoice(): Promise<ItemAddedInNewInvoice[]> {
    //will get items that are added in the cart.
    return;
  }

  async deleteItemFromNewInvoice(itemId: number, invoiceNumber: number): Promise<void> {
    return;
  }
}
