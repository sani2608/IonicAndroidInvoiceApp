/* eslint-disable max-len */
// eslint-disable-next-line max-len


const ItemTableQuery ='CREATE TABLE IF NOT EXISTS Item(  item_id INTEGER PRIMARY KEY ASC AUTOINCREMENT  NOT NULL, name TEXT NOT NULL UNIQUE,  price REAL NOT NULL,uom TEXT NOT NULL);';
const CustomerTableQuery = 'CREATE TABLE IF NOT EXISTS Customer(  customer_id INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL, first_name TEXT NOT NULL, last_name TEXT DEFAULT[]);';
const CartTableQuery = 'CREATE TABLE IF NOT EXISTS Cart( invoice_id INTEGER REFERENCES Invoice(invoice_id) MATCH[FULL] NOT NULL,item_id INTEGER REFERENCES Item(item_id),  quantity INTEGER DEFAULT(0),price REAL NOT NULL,  total_item_price REAL    DEFAULT[0],  PRIMARY KEY(    invoice_id,    item_id  ));';
const InvoiceTableQuery = 'CREATE TABLE IF NOT EXISTS Invoice(  invoice_id   INTEGER PRIMARY KEY AUTOINCREMENT UNIQUE NOT NULL,  customer_id  INTEGER REFERENCES Customer(customer_id),  created_date TEXT    NOT NULL,  total_price  REAL    DEFAULT[]);';
const TriggerQuery = 'DROP TRIGGER IF EXISTS update_total_price;CREATE TRIGGER update_total_priceAFTER INSERTON CartBEGINUPDATE InvoiceSET total_price = (  SELECT sum(quantity * price)FROM CartWHERE Cart.invoice_id = Invoice.invoice_id);END;';
export { ItemTableQuery, CustomerTableQuery, CartTableQuery, InvoiceTableQuery, TriggerQuery };
