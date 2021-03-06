/* eslint-disable no-underscore-dangle */
//? this Item model is to enter values in Item table.
export class Item {
  private _itemId: number;
  private _name: string;
  private _price: number;
  private _uom: string;

  constructor(
    itemId?: number,
    name?: string,
    price?: number,
    uom?: string
  ) {
    this._itemId = itemId;
    this._name = name;
    this._price = price;
    this._uom = uom;
  }

  /** Getter itemId  @return {number} */
  public get itemId(): number {
    return this._itemId;
  }

  /** Setter itemId @param {number} value  */
  public set itemId(value: number) {
    this._itemId = value;
  }

  /** Getter name @return {string} */
  public get name(): string {
    return this._name;
  }

  /** Setter name @param {string} name */
  public set name(name: string) {
    this._name = name;
  }

  /**
   * Getter price @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Setter price @param {number} price
   */
  public set price(price: number) {
    this._price = price;
  }

  /**
   * Getter uom @return {string}
   */
  public get uom(): string {
    return this._uom;
  }

  /**
   * Setter uom @param {string} uom
   */
  public set uom(uom: string) {
    this._uom = uom;
  }
}
//? this model is used when add items in new INvoice
export class ItemAddedInNewInvoice {
  private _itemId: number;
  private _name: string;
  private _price: number;
  private _uom: string;
  private _quantity: number;
  private _totalPrice: number;
  constructor(
    itemId?: number,
    name?: string,
    price?: number,
    uom?: string,
    quantity?: number,
    totalPrice?: number
  ) {
    this._itemId = itemId;
    this._name = name;
    this._price = price;
    this._uom = uom;
    this._quantity = quantity;
    this._totalPrice = totalPrice;
  }

  /**
   * Getter itemId  @return {number}
   */
  public get itemId(): number {
    return this._itemId;
  }

  /**
   * Getter name @return {string}
   */
  public get name(): string {
    return this._name;
  }

  /**
   * Setter name @param {string} name
   */
  public set name(name: string) {
    this._name = name;
  }

  /**
   * Getter price @return {number}
   */
  public get price(): number {
    return this._price;
  }

  /**
   * Setter price @param {number} price
   */
  public set price(price: number) {
    this._price = price;
  }

  /**
   * Getter uom @return {string}
   */
  public get uom(): string {
    return this._uom;
  }

  /**
   * Setter uom @param {string} uom
   */
  public set uom(uom: string) {
    this._uom = uom;
  }

  /**
   * Getter quantity @return {number}
   */
  public get quantity(): number {
    return this._quantity;
  }

  /**
   * Setter quantity @param {number} quantity
   */
  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  /**
   * Getter totalPrice @return {number}
   */
  public get totalPrice(): number {
    this._totalPrice = this._quantity * this._price;
    return this._totalPrice;
  }

}
//? this Cart model is to enter values in Cart table.
export class Cart {
  private _invoiceId: number;
  private _itemId: number;
  private _quantity: number;
  private _buyPrice: number;
  private _totalItemPrice: number;

  constructor() { }


  /**
   * Getter invoiceId @return {number}
   */
  public get invoiceId(): number {
    return this._invoiceId;
  }

  /**
   * Setter invoiceId @param {number} value
   */
  public set invoiceId(value: number) {
    this._invoiceId = value;
  }


  /**
   * Getter itemId @return {number}
   */
  public get itemId(): number {
    return this._itemId;
  }

  /**
   * Setter itemId @param {number} value
   */
  public set itemId(value: number) {
    this._itemId = value;
  }



  /**
   * Getter quantity @return {number}
   */
  public get quantity(): number {
    return this._quantity;
  }

  /**
   * Setter quantity @param {number} quantity
   */
  public set quantity(quantity: number) {
    this._quantity = quantity;
  }

  /**
   * Getter buyPrice @return {number}
   */
  public get buyPrice(): number {
    return this._buyPrice;
  }

  /**
   * Setter buyPrice @param {number} buyPrice
   */
  public set buyPrice(buyPrice: number) {
    this._buyPrice = buyPrice;
  }

  /**
   * Getter totalItemPrice @return {number}
   */
  public get totalItemPrice() {
    this._totalItemPrice = this.buyPrice * this.quantity;
    return this._totalItemPrice;
  }
}
//? this Customer model is to enter values in Customer table.
export class Customer {
  private _customerId: number;
  private _firstName: string;
  private _lastName: string;
  constructor() { }
  public get fullName() {
    return `${this._firstName} ${this._lastName}`;
  }

  /**
   * Getter customerId @return {string}
   */

  /**
   * Setter customerId @param {number} customerId
   */
  public set customerId(customerId: number) {
    this._customerId = customerId;
  }
  public get customerId(): number {
    return this._customerId;
  }

  /**
   *Getter firstName @return {string}
   */
  public get firstName(): string {
    return this._firstName;
  }

  /**
   * Setter firstName @param {string} value
   */
  public set firstName(value: string) {
    this._firstName = value;
  }

  /**
   * Getter lastName @return {string}
   */
  public get lastName(): string {
    return this._lastName;
  }

  /**
   * Setter lastName @param {string} value
   */
  public set lastName(value: string) {
    this._lastName = value;
  }
}
//? this Invoice model is to enter values in Invoice table.
export class Invoice {
  private _invoiceId: number;
  private _customerId: number;
  private _createDate: number;
  private _totalPrice: number;

  constructor() { }

  /**
   * Getter invoiceId @return {number}
   */
  public get invoiceId(): number {
    return this._invoiceId;
  }

  /**
   * Setter invoiceId @param {number} value
   */
  public set invoiceId(value: number) {
    this._invoiceId = value;
  }


  /**
   * Getter customerId @return {number}
   */
  public get customerId(): number {
    return this._customerId;
  }

  /**
   * Setter customerId @param {number} value
   */
  public set customerId(value: number) {
    this._customerId = value;
  }


  /**
   * Getter createDate @return {number}
   */
  public get createDate(): number {
    return this._createDate;
  }

  /**
   * Setter createDate @param {number} value
   */
  public set createDate(value: number) {
    this._createDate = value;
  }

  /**
   * Getter totalPrice @return {number}
   */
  public get totalPrice(): number {
    return this._totalPrice;
  }

  /**
   * Setter totalPrice @param {number} value
   */
  public set totalPrice(value: number) {
    this._totalPrice = value;
  }
}

//? this model will be used on home page to display data.
export class Invoices {
  private _customerFullName: string;
  private _totalItems: number;
  private _invoiceId: number;
  private _createdDate: string;
  private _totalPrice: number;

  constructor(
    invoiceId?: number,
    createDate?: string,
    totalPrice?: number,
    totalItems?: number,
    customerFullName?: string,
  ) {
    this._invoiceId = invoiceId;
    this._createdDate = createDate;
    this._totalPrice = totalPrice;
    this._totalItems = totalItems;
    this._customerFullName = customerFullName;
  }



  public get invoiceId(): number {
    return this._invoiceId;
  }


  public set invoiceId(value: number) {
    this._invoiceId = value;
  }


  public get createdDate(): string {
    return this._createdDate;
  }

  public set createdDate(value: string) {
    this._createdDate = value;
  }


  public get totalPrice(): number {
    return this._totalPrice;
  }


  public set totalPrice(value: number) {
    this._totalPrice = value;
  }


  public get totalItems(): number {
    return this._totalItems;
  }

  public set totalItems(value: number) {
    this._totalItems = value;
  }


  public get customerFullName(): string {
    return this._customerFullName;
  }


  public set customerFullName(value: string) {
    this._customerFullName = value;
  }

}




