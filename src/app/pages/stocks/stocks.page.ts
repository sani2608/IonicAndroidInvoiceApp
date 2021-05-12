/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  //TODO: replace this with actual Data.
  private _itemsInStock = [
    {
      itemId: 1,
      name: 'onion',
      price: 24,
      uom: 'kg'
    },
    {
      itemId: 2,
      name: 'potato',
      price: 30,
      uom: 'kg'
    },
    {
      itemId: 3,
      name: 'milk',
      price: 30,
      uom: 'Litre'
    },
    {
      itemId: 4,
      name: 'cabbage',
      price: 40,
      uom: 'kg'
    },
    {
      itemId: 5,
      name: 'rice',
      price: 100,
      uom: 'kg'
    },
  ];

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.getAllItems();
    console.log('ngOnInit lifecycle inside Stocks');
  }

  /** Getter itemsInStock used by template */
  public get itemsInStock() {
    return this.dataService.listOfItemsInStock;
  }

  /** This will get all the items present in the stock from Database */
   getAllItems() {
      this.dataService.isDatabasePresent().then(
        () => this.dataService.getListOfItemsFromStock()
      );
  }
}
