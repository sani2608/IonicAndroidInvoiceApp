import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/alert';
import { Cart, Customer} from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-add-item-in-invoice',
  templateUrl: './add-item-in-invoice.page.html',
  styleUrls: ['./add-item-in-invoice.page.scss'],
})
export class AddItemInInvoicePage implements OnInit {
  cart = new Cart(123,234);
  constructor(
    private alert: Alert,
    private dataService: DataService
  ) { }

  ngOnInit() {
      }

  cardClicked() {
    this.alert.presentAlertPrompt();
  }


  getItemsFromStock() {
    //TODO getItemsFromInvoice
    this.dataService.getItems(); //subscribe
  }

  addItemInInvoice(itemId: number,quantity: number){
    //TODO: implement AddItemInInvoice() function.
    this.dataService.addItemInInvoice(itemId, quantity);
  }


}
