import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/alert';
import { Cart} from 'src/app/models/data';

@Component({
  selector: 'app-add-item-in-invoice',
  templateUrl: './add-item-in-invoice.page.html',
  styleUrls: ['./add-item-in-invoice.page.scss'],
})
export class AddItemInInvoicePage implements OnInit {
  cart = new Cart(123,234);
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
