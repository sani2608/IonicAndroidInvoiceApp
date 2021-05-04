import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-item-in-invoice',
  templateUrl: './add-item-in-invoice.page.html',
  styleUrls: ['./add-item-in-invoice.page.scss'],
})
export class AddItemInInvoicePage implements OnInit {

  constructor(
    private alert: Alert
  ) { }

  ngOnInit() {
  }

  cardClicked() {
    this.alert.presentAlertPrompt();
  }

  getAllItemsFromStock(){
    //TODO: implement getAllItemsFromStock() function.
  }
  addItemInInvoice(){
    //TODO: implement AddItemInInvoice() function.
  }

}
