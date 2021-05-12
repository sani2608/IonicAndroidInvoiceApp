/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Customer, Invoice, Invoices, Item, ItemAddedInNewInvoice, ReadOnlyInvoice } from '../models/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { ItemTableQuery, CustomerTableQuery, CartTableQuery, InvoiceTableQuery, TriggerQuery } from '../services/sqlQueries/queries';
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
    private platform: Platform) {
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
  async isDatabasePresent(): Promise<boolean> {
    return false;
  }

  databaseState() {
    return this.isDatabaseReady.asObservable();
  }


  async createDatabase(): Promise<void> {
    // if isDatabasePresent returns false then create DATABASE..
    await this.sqlite.create({
      name: 'invoice.db',
      location: 'default'
    }).then((databaseObj: SQLiteObject) => {
      this.databaseObject = databaseObj;
    }).then(
      () => this.databaseObject.executeSql(ItemTableQuery, [])
        .then(
          () => this.databaseObject.executeSql(CustomerTableQuery,[])
          .then(
            () => this.databaseObject.executeSql(InvoiceTableQuery,[])
            .then(
              () => this.databaseObject.executeSql(CartTableQuery,[])
              .then(
                () => this.databaseObject.executeSql(TriggerQuery,[]).then(() => console.log('ALL THE TABLES CREATED SUCCESSFULLY.'))
              )
            )
          )
        )
      ).catch((e) => console.log('error while creating tables\n', e));
  }


  //? ITEMS TABLE RELATED FUNCTIONS
  async isItemPresentInStock(itemName: string): Promise<boolean> {
    console.log('will check if ' + itemName + ' is present in Database');
    await this.databaseObject.executeSql(`SELECT name FROM Item where name LIKE ${itemName}`,[])
    .then((res) => console.log(res.row.Item(0))).catch((e) => console.log('got some error\n', e));
    return true;
  }

  // async addItemm(): Promise<void> {
  //   await this.databaseObject.executeSql("INSERT INTO addstocks(name , price, UOM ) VALUES (?,?,?)", [this.stock.name, this.stock.price, this.stock.UOM]).catch((res) => console.log(res));
  //   await this.databaseObject.executeSql('SELECT * FROM Item');
  // }

  async addItemInStock(item: Item): Promise<void> {
    console.log('addIem from dataService\n', item);
    await this.databaseObject.executeSql('INSERT INTO Item(name, price, uom ) VALUES (?,?,?)', [item.name, item.price, item.uom])
      .then(() => console.log('insert query executed successfully'))
      .catch((e) => console.log(item.name + ' is already present in the databse.'));

  }

  async updateItemInStock(item: Item, itemId: number): Promise<void> {
    console.log('updateItem from dataService\n', item, itemId);
    await this.databaseObject.executeSql(`UPDATE Item SET name = ?, price = ?,  uom = ? WHERE item_id = ${itemId}`, [item.name, item.price, item.uom])
      .then((response) => console.log('update query complete from database service \n', response))
      .catch((e) => console.log('got error while updateing item \n', e));
  }

  /**
   * @param itemId is the itemId of the item
   * @returns single item Object
   */
  async getItemByItemIdFromStock(itemId: number): Promise<Item> {
    console.log('from dataservice', itemId);
    const item = new Item();
    await this.databaseObject.executeSql('SELECT item_id,name,price,uom FROM Item WHERE item_id=?', [itemId])
      .then((res) => {
        console.log('Select query by id executed successfully and response is', res);
        item.itemId = res.rows.item(0).item_id;
        item.name = res.rows.item(0).name;
        item.price = res.rows.item(0).price;
        item.uom = res.rows.item(0).price;
        // console.log(item);
      }
      );
    return item;
  }

  /**
   * @returns list of items present in the stock */
  async getListOfItemsFromStock(): Promise<Item[]> {
    //gets items list from DATABASE.
    await this.databaseObject.executeSql('SELECT item_id,name,price,uom FROM Item', [])
      .then((res) => {
        console.log('Select query executed successfully and response is', res);
        let items = [];
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            items.push({
              itemId: res.rows.item(i).item_id,
              name: res.rows.item(i).name,
              price: res.rows.item(i).price,
              uom: res.rows.item(i).uom
            });
          }
        }
        console.log(items);
        this._listOfItemsInStock.next(items);
      })
      .catch((res) => console.log(res));
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
