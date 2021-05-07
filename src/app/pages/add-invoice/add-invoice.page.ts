import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/shared/alert';

@Component({
  selector: 'app-add-invoice',
  templateUrl: './add-invoice.page.html',
  styleUrls: ['./add-invoice.page.scss'],
})
export class AddInvoicePage implements OnInit {
  //TODO: to be replace with real data.
  itemsInCart = [
    {
      cartId:100,
      name: 'Onion',
      quantity: 23,
      price: 20,
      uom: 'kg',
      totalPrice: 460,
    },
    {
      cartId:101,
      name: 'Milk',
      quantity: 5,
      price: 30,
      uom: 'Litre',
      totalPrice: 150,
    },
    {
      cartId:102,
      name: 'Cabbage',
      quantity: 10,
      price: 40,
      uom: 'kg',
      totalPrice: 400,
    },
];
  constructor(
    private alert: Alert
  ) { }

  ngOnInit() {
    //run after 1 second delay.
    setTimeout(() => {
      this.alert.presentAlertPromptForCustomerInfo();
    }, 1000);

  }

  getCustomerName(){
    //TODO: implement getCustomerName() function.
  }
  getItemsFromCart(){
    //TODO: Implement getItemsFromCart() function.
  }
  deleteItemFromCart(){
    //TODO: Implement deleteItemFromCart() function.
  }
}
