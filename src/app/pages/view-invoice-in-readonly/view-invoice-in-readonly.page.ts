import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-invoice-in-readonly',
  templateUrl: './view-invoice-in-readonly.page.html',
  styleUrls: ['./view-invoice-in-readonly.page.scss'],
})
export class ViewInvoiceInReadonlyPage implements OnInit {

  //TODO: to be replace later.
  readOnlyItemList = [
    {
      cartId: 100,
      name: 'Onion',
      quantity: 23,
      price: 20,
      uom: 'kg',
      totalPrice: 460,
    },
    {
      cartId: 101,
      name: 'Milk',
      quantity: 5,
      price: 30,
      uom: 'Litre',
      totalPrice: 150,
    },
    {
      cartId: 102,
      name: 'Cabbage',
      quantity: 10,
      price: 40,
      uom: 'kg',
      totalPrice: 400,
    },
  ];

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
  }
  public getInvoiceByInvoiceId(invoiceId: number): void {
    //get id from activated routerlink.
    this.dataService.getInvoiceDetailsByInvoiceId(invoiceId);  //subscribe
  }

}
