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
      name: 'onion',
      price: 24,
      uom: 'kg'
    },
    {
      name: 'potato',
      price: 30,
      uom: 'kg'
    },
    {
      name: 'milk',
      price: 30,
      uom: 'Litre'
    },
    {
      name: 'cabbage',
      price: 40,
      uom: 'kg'
    },
    {
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
