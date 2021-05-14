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

  /**
   * Getter itemId  @return {number}
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
}
//? this model is used when add items in new INvoice
export class ItemAddedInNewInvoice {
  private _itemId: number;
  private _name: string;
  private _price: number;
  private _uom: string;
  private _quantity: number;
  private _totalPrice: number;
  constructor(itemId: number) {
    this._itemId = itemId;
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
    const total = this._quantity * this._totalPrice;
    return total;
  }
}
//? this Cart model is to enter values in Cart table.
export class Cart {
  private _invoiceId: number;
  private _itemId: number;
  private _quantity: number;
  private _buyPrice: number;
  private _totalItemPrice: number;

  constructor() {}


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
  public get fullName(){
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

  constructor() {}

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
  private _invoiceNumber: number;
  private _createdDate: number;
  private _totalPrice: number;

  constructor(invoiceNumbar: number) {
    this._invoiceNumber = invoiceNumbar;
  }

  /**
   * Getter customerName @return {string}
   */
  public get customerFullName(): string {
    return this._customerFullName;
  }

  /**
   * Setter customerName @param {string} customerFullName
   */
  public set customerFullName(customerFullName: string) {
    this._customerFullName = customerFullName;
  }

  /**
   * Getter totalItems @return {number}
   */
  public get totalItems(): number {
    return this._totalItems;
  }

  /**
   * Setter totalItems @param {number} totalItems
   */
  public set totalItems(totalItems: number) {
    this._totalItems = totalItems;
  }

  /**
   * Getter invoiceNumber @return {number}
   */
  public get invoiceNumber(): number {
    return this._invoiceNumber;
  }

  /**
   * Getter createdDate @return {number}
   */
  public get createdDate(): number {
    return this._createdDate;
  }

  /**
   * Setter createdDate @param {number} createdDate
   */
  public set createdDate(createdDate: number) {
    this._createdDate = createdDate;
  }

  /**
   * Getter totalPrice @return {number}
   */
  public get totalPrice(): number {
    return this._totalPrice;
  }

  /**
   * Setter totalPrice @param {number} totalPrice
   */
  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
  }
}

//? this model will be used to display data on ReadOnly page.
export class ReadOnlyInvoice {
  private _customerFullName: string;
  private _createdDate: number;
  private _invoiceNumber: number;
  private _totalItems: number;
  private _totalQuantity: number;
  private _itemName: string;
  private _itemPrice: number;
  private _itemQuantity: number;
  private _totalPrice: number;
  private _uom: string;

  constructor(invoiceNumber: number) {
    this._invoiceNumber = invoiceNumber;
  }

  /**
   * Getter invoiceNumber @return {number}
   */
  public get invoiceNumber(): number {
    return this._invoiceNumber;
  }

  /**
   * Getter customerFullName @return {string}
   */
  public get customerFullName(): string {
    return this._customerFullName;
  }

  /**
   * Setter customerFullName @param {string} customerFullName
   */
  public set customerFullName(customerFullName: string) {
    this._customerFullName = customerFullName;
  }

  /**
   * Getter createdDate @return {number}
   */
  public get createdDate(): number {
    return this._createdDate;
  }

  /**
   * Setter createdDate @param {number} createdDate
   */
  public set createdDate(createdDate: number) {
    this._createdDate = createdDate;
  }

  /**
   * Getter totalItems @return {number}
   */
  public get totalItems(): number {
    return this._totalItems;
  }

  /**
   * Setter totalItems @param {number} totalItems
   */
  public set totalItems(totalItems: number) {
    this._totalItems = totalItems;
  }

  /**
   * Getter totalQuantity @return {number}
   */
  public get totalQuantity(): number {
    return this._totalQuantity;
  }

  /**
   * Setter totalQuantity @param {number} totalQuantity
   */
  public set totalQuantity(totalQuantity: number) {
    this._totalQuantity = totalQuantity;
  }

  /**
   * Getter itemName @return {string}
   */
  public get itemName(): string {
    return this._itemName;
  }

  /**
   * Setter itemName @param {string} itemName
   */
  public set itemName(itemName: string) {
    this._itemName = itemName;
  }

  /**
   * Getter itemPrice @return {number}
   */
  public get itemPrice(): number {
    return this._itemPrice;
  }

  /**
   * Setter itemPrice @param {number} itemPrice
   */
  public set itemPrice(itemPrice: number) {
    this._itemPrice = itemPrice;
  }

  /**
   * Getter itemQuantity @return {number}
   */
  public get itemQuantity(): number {
    return this._itemQuantity;
  }

  /**
   * Setter itemQuantity @param {number} itemQuantity
   */
  public set itemQuantity(itemQuantity: number) {
    this._itemQuantity = itemQuantity;
  }

  /**
   * Getter totalPrice @return {number}
   */
  public get totalPrice(): number {
    return this._totalPrice;
  }

  /**
   * Setter totalPrice @param {number} totalPrice
   */
  public set totalPrice(totalPrice: number) {
    this._totalPrice = totalPrice;
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



