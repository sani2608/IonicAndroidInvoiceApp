import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() { }
  clickStock() {
    console.log('Stocks button clicked');
  }
  //* ALL THE FUNCTIONS TO BE IMPLEMENTED

  getAllInvoices(){
    //TODO: Implement getAllInvoice() function.
  }
  searchInvoice(){
    //TODO: Implement searchInvoice() function.
  }
}
