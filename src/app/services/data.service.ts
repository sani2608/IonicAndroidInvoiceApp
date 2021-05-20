/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Cart, Customer, Invoices, Item, ItemAddedInNewInvoice } from '../models/data';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { itemTableQuery, customerTableQuery, cartTableQuery, invoiceTableQuery, triggerQuery, CustomQueries } from '../services/sqlQueries/queries';
@Injectable({
  providedIn: 'root'
})
export class DataService {

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
  async getListOfItemsFromStock(): Promise<Item[]> {
    const itemsArray: Array<Item> = [];
    await this.databaseObject.executeSql(this.customQueries.getItemsFromStock(), [])
      .then((res) => {
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const newItemData = new Item(
              res.rows.item(i).item_id,
              res.rows.item(i).name,
              res.rows.item(i).price,
              res.rows.item(i).uom);
            itemsArray.push(newItemData);
          }
        }
      }
      ).catch((response) => console.log(response));
    return itemsArray;
  }

  //? HOME SECTION RELATED FUNCTION
  async getAllInvoices(): Promise<Invoices[]> {
    const invoiceArray: Array<Invoices> = [];
    await this.databaseObject.executeSql(this.customQueries.getInvoicesForHomePage(), [])
      .then((resp) => {
        if (resp.rows.length > 0) {
          for (let i = 0; i < resp.rows.length; i++) {
            const newInvoiceData = new Invoices(
              resp.rows.item(i).customer_full_name,
              resp.rows.item(i).total_items_in_cart,
              resp.rows.item(i).invoice_id,
              resp.rows.item(i).created_date,
              resp.rows.item(i).total_price);
            invoiceArray.push(newInvoiceData);
          }
        }
      }
      ).catch((response) => console.log(response));
    return invoiceArray;
  }

  //? READONLY PAGE  FUNCTION
  async getInvoiceDetailsByInvoiceId(invoiceId: number): Promise<Invoices> {
    const readOnlyInvoice: Invoices = new Invoices();
    await this.databaseObject.executeSql(this.customQueries.getReadOnlyInvoiceDetailsById(invoiceId), [])
      .then(
        (response) => {
          readOnlyInvoice.customerFullName = response.rows.item(0).customer_full_name;
          readOnlyInvoice.totalItems = response.rows.item(0).total_items_in_cart;
          readOnlyInvoice.invoiceId = response.rows.item(0).invoice_id;
          readOnlyInvoice.createdDate = response.rows.item(0).created_date;
          readOnlyInvoice.totalPrice = response.rows.item(0).total_price;
        }).catch((e) => console.log('got error while getting invoide', e));
    return readOnlyInvoice;
  }


  //? NEW INVOICE PAGE RELATED FUNCTIONS
  async createNewInvoice(customerId: number): Promise<number> {
    let invoiceNumber: number;
    await this.databaseObject.executeSql(this.customQueries.createNewInvoice(customerId), [])
      .then((res) => {
        console.log('New Invoice Created Successfully.. with Id = ', res.insertId);
        invoiceNumber = res.insertId;
      }).catch((e) => console.log('Error while creating New Invoice..', e));
    return invoiceNumber;
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


  async addItemInNewInvoice(item: Cart): Promise<void> {
    const itemDataArrayToBePassedInQuery: Array<number> = [item.invoiceId, item.itemId, item.buyPrice, item.quantity, item.totalItemPrice];
    await this.databaseObject.executeSql(this.customQueries.addItemToCart(), itemDataArrayToBePassedInQuery)
      .then((response) => {
        console.log('Item added successfully in Cart ', response);
      })
      .catch(err => console.log('Got error while adding item to cart', err));
  }

  async getItemsFromNewInvoice(invoiceId: number): Promise<ItemAddedInNewInvoice[]> {
    const itemsInInvoiceArray: Array<ItemAddedInNewInvoice> = [];
    await this.databaseObject.executeSql(this.customQueries.getItemsFromCartByInvoiceId(invoiceId), [])
      .then((res) => {
        console.log('got response from get new items from cart', res);
        if (res.rows.length > 0) {
          for (let i = 0; i < res.rows.length; i++) {
            const newItemData = new ItemAddedInNewInvoice(
              res.rows.item(i).item_id,
              res.rows.item(i).name,
              res.rows.item(i).price,
              res.rows.item(i).uom,
              res.rows.item(i).quantity,
              res.rows.item(i).total_item_price,
            );
            itemsInInvoiceArray.push(newItemData);
          }
        }
      }
      ).catch((response) => console.log('got error while fetching items\n', response));
    console.log(itemsInInvoiceArray);
    return itemsInInvoiceArray;
  }

  async deleteItemFromNewInvoice(itemId: number, invoiceId: number, index: number): Promise<void> {
    await this.databaseObject
      .executeSql(this.customQueries.deleteCartItemByInvoiceIdAndItemId(itemId, invoiceId), [])
      .then((res) => {
        console.log('Item Deleted', res.rows.item(0));
      })
      .catch(e => console.log('Got Error While Deleting Item..', e));
  }
}
