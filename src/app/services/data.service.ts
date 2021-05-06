import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  //? Database related functions.
  //1. check if the database is present.
  isDatabasePresent(){}


  //*DATABASE CRUD FUNCTIONS.
  //? Items Table
  addItemInDB(){
    //TODO: implement addItemInDB() function.
  }
  updateItemInDB(){
    //TODO impmlement updateItemInDB() function.
  }
  getItemsFromDB(){
    //TODO: implement getItemsFromDB() function.
  }
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
