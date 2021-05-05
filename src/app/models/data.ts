/* eslint-disable no-underscore-dangle */

export class Item {
  private _itemId: number;
  private _name: string;
  private _price: number;
  private _uom: string;
  constructor(itemId: number) {
    this._itemId = itemId;
  }

  /**
   * Getter $itemId  @return {number}
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

}

export class Cart {
  private _invoiceId: number;
  private _itemId: number;
  private _quantity: number;
  private _butPrice: number;

  constructor(
    invoiceId: number,
    itemId: number
  ) {
    this._invoiceId = invoiceId;
    this._itemId = itemId;
  }

  /**
   * Getter invoiceId @return {number}
   */
  public get invoiceId(): number {
    return this._invoiceId;
  }

  /**
   * Getter itemId @return {number}
   */
  public get itemId(): number {
    return this._itemId;
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
   * Getter butPrice @return {number}
   */
  public get butPrice(): number {
    return this._butPrice;
  }

  /**
   * Setter butPrice @param {number} buyPrice
   */
  public set butPrice(buyPrice: number) {
    this._butPrice = buyPrice;
  }

}

export class Customer {
  private _customerId: number;
  private _firstName: string;
  private _lastName: string;
  constructor(
    customerId: number
  ) {
    this._customerId = customerId;
  }
  /**
   * Getter customerId @return {string}
   */
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
  /**
   * @returns fullName of customer
   */
  public getFullName(): string {
    return `${this._firstName}  ${this._lastName}`;
  }
}

export class Invoice {
  private _invoiceId: number;
  private _customerId: number;
  private _createDate: number;
  private _totalPrice: number;

  constructor(
    invoiceId: number,
    customerId: number,
    ) {
      this._invoiceId = invoiceId;
      this._customerId = customerId;
	}

    /**
     * Getter invoiceId @return {number}
     */
	public get invoiceId(): number {
		return this._invoiceId;
	}

    /**
     * Getter customerId @return {number}
     */
	public get customerId(): number {
		return this._customerId;
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
