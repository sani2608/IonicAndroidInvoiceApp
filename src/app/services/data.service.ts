/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Customer, Invoice, Invoices, Item, ItemAddedInNewInvoice, ReadOnlyInvoice } from '../models/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { itemTableQuery, customerTableQuery, cartTableQuery, invoiceTableQuery, triggerQuery, CustomQueries } from '../services/sqlQueries/queries';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DataService {
  //? Private variables to store data.
  /** this variable will store all the items present in the stock */
  private _listOfItemsInStock: BehaviorSubject<Array<Item>> = new BehaviorSubject([]);
  /**this will store all the invoice to show on homepage */
  private _homePageInvoiceList: Array<Invoice[]> = [];
  /** This will store the items that are added in stock while creating new invoice */
  private _itemsAddedInNewInvoice: Array<ItemAddedInNewInvoice[]> = [];
  /** This will store the ready only invoice details */
  private _readOnlyInvoiceDetails: ReadOnlyInvoice;
  //?DATABASE OBJECT
  private databaseObject: SQLiteObject;
  private isDatabaseReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private sqlite: SQLite,
    private platform: Platform,
    private customQueries: CustomQueries
  ) {
    this.platform.ready().then(() => {
      console.log('PLATFORM READY FOR DATABASE OPERATIONS');
      this.createDatabase()
        .then(() => this.isDatabaseReady.next(true));
    });
  }

  //? Getters and Setters for private variables
  /** Getter listOfItemsInStock */
  public get listOfItemsInStock(): Observable<Item[]> {
    return this._listOfItemsInStock.asObservable();
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
  databaseState() {
    return this.isDatabaseReady.asObservable();
  }

  async createDatabase(): Promise<void> {
    await this.sqlite.create({
      name: 'invoice.db',
      location: 'default'
    }).then((databaseObj: SQLiteObject) => {
      this.databaseObject = databaseObj;
    }).then(
      () => this.databaseObject.executeSql(itemTableQuery, [])
        .then(
          () => this.databaseObject.executeSql(customerTableQuery, [])
            .then(
              () => this.databaseObject.executeSql(invoiceTableQuery, [])
                .then(
                  () => this.databaseObject.executeSql(cartTableQuery, [])
                    .then(
                      () => this.databaseObject.executeSql(triggerQuery, [])
                        .then(() => console.log('ALL THE TABLES CREATED SUCCESSFULLY.'))
                    ))))).catch((error) => console.log('GOT ERROR WHILE CREATING TABLES\n', error));
  }

  //? ITEMS TABLE RELATED FUNCTIONS
  async addItemInStock(item: Item): Promise<void> {
    const itemDataArrayToBePassedInQuery: Array<string | number> = [item.name.toLowerCase(), item.price, item.uom];
    await this.databaseObject.executeSql(this.customQueries.insertNewItem(), itemDataArrayToBePassedInQuery);
  }

  async updateItemInStock(item: Item, itemId: number): Promise<void> {
    const itemDataArrayToBePassedInQuery: Array<string | number> = [item.name.toLowerCase(), item.price, item.uom];
    await this.databaseObject.executeSql(this.customQueries.updateItemById(itemId), itemDataArrayToBePassedInQuery);
  }

  /**
   * @param itemId is the itemId of the item
   * @returns single item Object
   */
  async getItemByItemIdFromStock(itemId: number): Promise<Item> {
    const item = new Item();
    await this.databaseObject.executeSql(this.customQueries.getItemById(itemId), [])
      .then((response) => {
        item.itemId = response.rows.item(0).item_id;
        item.name = response.rows.item(0).name;
        item.uom = response.rows.item(0).uom;
        item.price = response.rows.item(0).price;
      });
    return item;
  }

  /**
   * @returns list of items present in the stock
   */
  async getListOfItemsFromStock(): Promise<void> {
    await this.databaseObject.executeSql(this.customQueries.getItemsFromStock(), [])
      .then((res) => {
        const items: Array<Item> = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const newItemData = new Item(
              res.rows.item(i).item_id,
              res.rows.item(i).name,
              res.rows.item(i).price,
              res.rows.item(i).uom);
            items.push(newItemData);
          }
        }
        this._listOfItemsInStock.next(items);
      }
      ).catch((response) => console.log(response));
  }

  //? HOME SECTION RELATED FUNCTION
  async getAllInvoices(): Promise<void> {
    await this.databaseObject.executeSql(this.customQueries.getAllInvoices(), [])
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
  async createNewInvoice(customerId: number): Promise<number> {
    let invoiceNumber: number;
    await this.databaseObject.executeSql(this.customQueries.createNewInvoice(customerId), [])
      .then((res) => {
        //console.log('created new invoice with id ', res.insertId);
        invoiceNumber = res.insertId;
      }).catch((e) => console.log('got some error', e));
    return invoiceNumber;
  }

  async getInvoiceById(invoiceId: number): Promise<Invoice> {
    const invoice: Invoice = new Invoice();
    await this.databaseObject.executeSql(this.customQueries.getInvoiceById(invoiceId),[]).then(
      (response) => {
        console.log(response.rows.item(0).customer_id);
        invoice.invoiceId = response.rows.item(0).invoice_id;
        invoice.customerId = response.rows.item(0).customer_id;
        invoice.createDate = response.rows.item(0).created_date;
        invoice.totalPrice = response.rows.item(0).total_price;
        console.log('got response', invoice);
      }).catch((e) => console.log('got error while getting invoide',e));
    return invoice;
  }

  //? CUSTOMER TABLE
  async addCustomer(customerName: Customer): Promise<number> {
    let customerId: number;
    console.log('adding customer to database', customerName.fullName);
    await this.databaseObject.executeSql(this.customQueries.addCustomer(),
      [customerName.firstName, customerName.lastName])
      .then(res => customerId = res.insertId)
      .catch(err => console.log('Got error while adding customer', err));
    return customerId;
  }

  async getCustomerById(customerId: number): Promise<void> {
    await this.databaseObject.executeSql(this.customQueries.getCustomerById(customerId), [])
      .then((response) => {
        console.log('Got Customer By Id ', response.rows.item(0));
      })
      .catch(err => console.log('Got error while customer by ID', err));
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
