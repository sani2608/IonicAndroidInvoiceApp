import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from '../models/data';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //? Database related functions.
  //1. check if the database is present.
  isDatabasePresent(){
    //return boolean value if db is presesnt.
    //use BehaviorSubject bolean.
  }

  createDatabase(){
    // if isDatabasePresent returns false then create DATABASE.
  }

  //? Items Table
  isItemPresent(value: string): boolean{
    //TODO implement function to check if item is present in Database.
    console.log('will check if '+ value + ' is present in Database');
    return true;
  }
  addItem(value: Item): void {
    //TODO: implement addItem function.
    console.log('addItem from dataService\n', value);
  }

  updateItem(value: Item): void {
    //TODO impmlement updateItemInDB() function.
    console.log('updateItem from dataService\n',value);
  }

  getItems(): Observable<Item[]>  {
    //TODO: implement getItemsFromDB() function.
    //Use behavioural subject to pass latest item value.
    //gets items list from DATABASE.
    return;
  }












  //*DATABASE CRUD FUNCTIONS.
  //? Invoice Table
  getInvoicesFromDB(){
    //TODO: implement getInvoicesFromDB() function.
  }
  //? Custmer Table
  getCustomersFromDB(){
    //TODO: implement getCustomersFromDB() function.
  }
  deleteCustomerFromDB(){
    //TODO: implement deleteCustomerFromDB() function
  }
  //? Cart Table
  getCartItemFromDB(){
    //TODO: implement getCartItemsFromDB() function.
  }
  deleteCartItem(){
    //TODO: implement deleteCartItem() function.
  }
  //* SEARCH FUNCTIONS
  searchInvoice(){
    //TODO: implement searchInvoice() function.
  }
}
