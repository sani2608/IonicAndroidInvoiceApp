/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart, Customer, Invoices, Item, ItemAddedInNewInvoice } from '../models/data';
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
  /** @returns boolean value for database ready for operation or not */
  databaseState() {
    return this.isDatabaseReady.asObservable();
  }

  /** Creates the Database and tables respectively */
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
  /** @param item is passed to database */
  async addItemInStock(item: Item): Promise<void> {
    const itemDataArrayToBePassedInQuery: Array<string | number> = [item.name.toLowerCase(), item.price, item.uom];
    await this.databaseObject.executeSql(this.customQueries.insertNewItem(), itemDataArrayToBePassedInQuery);
  }

  /**
   * @param item is item that will get updated
   * @param itemId based on itemid item will be updated
   */
  async updateItemInStock(item: Item, itemId: number): Promise<void> {
    const itemDataArrayToBePassedInQuery: Array<string | number> = [item.name.toLowerCase(), item.price, item.uom];
    await this.databaseObject.executeSql(this.customQueries.updateItemById(itemId), itemDataArrayToBePassedInQuery);
  }

  /**
   * @param itemId is the itemId of the item
   * @returns single item Object
   */
  async getItemByItemIdFromStock(itemId: number): Promise<Item> {
    const response = await this.databaseObject.executeSql(this.customQueries.getItemById(itemId), []);
    const item = new Item();
    item.itemId = response.rows.item(0).item_id;
    item.name = response.rows.item(0).name;
    item.uom = response.rows.item(0).uom;
    item.price = response.rows.item(0).price;
    return item;
  }

  /**
   * @returns list of items present in the stock
   */
  async getListOfItemsFromStock(): Promise<Item[]> {
    const res = await this.databaseObject.executeSql(this.customQueries.getItemsFromStock(), [])
      .catch((response) => console.log(response));
    const itemsArray: Array<Item> = [];
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
    return itemsArray;
  }

  //? HOME SECTION RELATED FUNCTION
  /** @returns list of all invoices present in databae */
  async getAllInvoices(): Promise<Invoices[]> {
    const response = await this.databaseObject.executeSql(this.customQueries.getInvoicesForHomePage(), [])
      .catch(() => 'Got Error while getting invoices');
    const invoiceArray: Array<Invoices> = [];
    if (response.rows.length > 0) {
      for (let i = 0; i < response.rows.length; i++) {
        const newInvoiceData = new Invoices(
          response.rows.item(i).invoice_id,
          response.rows.item(i).created_date,
          response.rows.item(i).total_price,
          response.rows.item(i).total_items_in_cart,
          response.rows.item(i).customer_full_name,
        );
        invoiceArray.push(newInvoiceData);
      }
    }
    return invoiceArray;
  }

  //? READONLY PAGE  FUNCTION
  /**
   * @param invoiceId is passed to get the data
   * @returns Invoice object
   */
  async getInvoiceDetailsByInvoiceId(invoiceId: number): Promise<Invoices> {
    const response = await this.databaseObject.executeSql(this.customQueries.getReadOnlyInvoiceDetailsById(invoiceId), []);
    const invoice: Invoices = new Invoices();
    invoice.invoiceId = response.rows.item(0).invoice_id;
    invoice.createdDate = response.rows.item(0).created_date;
    invoice.totalPrice = response.rows.item(0).total_price;
    invoice.totalItems = response.rows.item(0).total_items_in_cart;
    invoice.customerFullName = response.rows.item(0).customer_full_name;
    return invoice;
  }

  //? NEW INVOICE PAGE RELATED FUNCTIONS
  /**
   * @param customerId is passed to new invoice
   * @returns invoiceId after invoice is created
   */
  async createNewInvoice(customerId: number): Promise<number> {
    const invoiceId = await this.databaseObject.executeSql(this.customQueries.createNewInvoice(customerId), [])
      .catch((e) => console.log('Error while creating New Invoice..', e));
    return invoiceId.insertId;
  }

  //? CUSTOMER TABLE
  /**
   * @param customerName is added to customer table
   * @returns customerId after customer name is inserted into table
   */
  async addCustomer(customerName: Customer): Promise<number> {
    const customer = await this.databaseObject
      .executeSql(this.customQueries.addCustomer(),
        [customerName.firstName, customerName.lastName])
      .catch(err => console.log('Got error while adding customer', err));
    return customer.insertId;
  }


  /** @param item is added to cart */
  async addItemInNewInvoice(item: Cart): Promise<void> {
    const itemDataArrayToBePassedInQuery:
      Array<number> = [item.invoiceId, item.itemId, item.buyPrice, item.quantity, item.totalItemPrice];
    await this.databaseObject.
      executeSql(this.customQueries.addItemToCart(), itemDataArrayToBePassedInQuery)
      .catch(err => console.log('Got error while adding item to cart', err));
  }

  /**
   * @param invoiceId is passed to database to get items in cart
   * @returns returns list of items present in the invoiceId
   */
  async getItemsFromNewInvoice(invoiceId: number): Promise<ItemAddedInNewInvoice[]> {
    const res = await this.databaseObject.executeSql(this.customQueries.getItemsFromCartByInvoiceId(invoiceId), []);
    const itemsInInvoiceArray: Array<ItemAddedInNewInvoice> = [];
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
    return itemsInInvoiceArray;
  }

  /**
   * @param itemId is passed to database to delete the item
   * @param invoiceId is passed to database to delete the item
   */
  async deleteItemFromNewInvoice(itemId: number, invoiceId: number): Promise<void> {
    await this.databaseObject
      .executeSql(this.customQueries.deleteCartItemByInvoiceIdAndItemId(itemId, invoiceId), [])
      .then((res) => {
        console.log('Item Deleted', res.rows.item(0));
      })
      .catch(e => console.log('Got Error While Deleting Item..', e));
  }
}
