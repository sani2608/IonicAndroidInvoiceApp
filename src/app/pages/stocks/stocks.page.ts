import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {

  //TODO: replace this with actual data from database.
  items = [
    {
      itemId:1,
      name: 'onion',
      price: 24,
      uom: 'kg'
    },
    {
      itemId:2,
      name: 'potato',
      price: 30,
      uom: 'kg'
    },
    {
      itemId:3,
      name: 'milk',
      price: 30,
      uom: 'Litre'
    },
    {
      itemId:4,
      name: 'cabbage',
      price: 40,
      uom: 'kg'
    },
    {
      itemId:5,
      name: 'rice',
      price: 100,
      uom: 'kg'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

  getAllItems(){
    //TODO: Implement getAllItems() function.
  }

}
