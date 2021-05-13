/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.page.html',
  styleUrls: ['./stocks.page.scss'],
})
export class StocksPage implements OnInit {


  constructor(
    private dataService: DataService,
  ) { }

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
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getListOfItemsFromStock();
        }
      });
  }
}
