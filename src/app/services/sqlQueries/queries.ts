/* eslint-disable max-len */
// eslint-disable-next-line max-len

import { NgModule } from '@angular/core';



const itemTableQuery = `
  CREATE TABLE IF NOT EXISTS Item(
  item_id INTEGER PRIMARY KEY ASC AUTOINCREMENT  NOT NULL,
  name TEXT NOT NULL UNIQUE,
  price REAL NOT NULL,
  uom TEXT NOT NULL
  );`;

const customerTableQuery = `
  CREATE TABLE IF NOT EXISTS Customer(
  customer_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT DEFAULT[]);`;

const cartTableQuery = `
  CREATE TABLE IF NOT EXISTS Cart(
  invoice_id INTEGER REFERENCES Invoice(invoice_id) MATCH[FULL] NOT NULL,
  item_id INTEGER REFERENCES Item(item_id),
  quantity INTEGER DEFAULT(0),
  price REAL DEFAULT[0],
  total_item_price REAL DEFAULT[0],
  PRIMARY KEY(invoice_id,item_id));`;

const invoiceTableQuery = `
  CREATE TABLE IF NOT EXISTS Invoice(
  invoice_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,
  customer_id INTEGER REFERENCES Customer(customer_id) ,
  created_date TEXT NOT NULL,
  total_price REAL DEFAULT[0]);`;

const triggerQuery = `
  CREATE TRIGGER IF NOT EXISTS update_total_price AFTER INSERT ON
  Cart BEGIN UPDATE Invoice SET total_price = (
  SELECT sum(quantity * price)
  FROM Cart WHERE Cart.invoice_id = Invoice.invoice_id);END;`;

export { itemTableQuery, customerTableQuery, cartTableQuery, invoiceTableQuery, triggerQuery };




@NgModule({})
/**
 * This class will contain all the custom queris
 */
export class CustomQueries {
  //global queries (can be used by anyone)
  getLastInsertedRowId = () => `SELECT last_insert_rowid()`;
  //query to delete all the rows
  deleteRows = (tableName: string) => `DELETE FROM ${tableName}`;
  //items related functions
  getItemsFromStock = () => `SELECT item_id,name,price,uom FROM Item`;
  insertNewItem = () => `INSERT INTO Item(name, price, uom ) VALUES (?,?,?)`;
  getItemById = (itemId: number) => `SELECT item_id,name,price,uom FROM Item WHERE item_id=${itemId}`;
  updateItemById = (itemId: number) => `UPDATE Item SET name = ?, price = ?,  uom = ? WHERE item_id = ${itemId}`;
  //invoice related functions
  createNewInvoice = (customerId: number) => `INSERT INTO Invoice(customer_id, created_date) VALUES (${customerId}, date('now'))`;
  getAllInvoices = () => `SELECT * FROM Invoice`;
  getInvoiceById = (invoiceId: number) => `SELECT * FROM Invoice WHERE invoice_id = ${invoiceId}`;
  //customer related functions
  addCustomer = () => `INSERT INTO Customer(first_name, last_name) VALUES(?,?)`;
  getCustomerById = (customerId: number) =>   `SELECT first_name, last_name FROM Customer WHERE customer_id=${customerId}`;
  getAllCustomer = () =>   `SELECT * FROM Customer`;
  //cart related functions queries
  addItemToCart = () => `INSERT INTO Cart(invoice_id, item_id, price, quantity, total_item_price) VALUES (?,?,?,?,?)`;
  getItemsFromCartByInvoiceId =() => ` select`;
}
