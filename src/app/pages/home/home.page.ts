/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { Invoices } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public searchText: string | number;
  private _homePageInvoiceList: Array<Invoices> = [];

	public get invoices(): Array<Invoices>  {
		return this._homePageInvoiceList;
	}



  constructor(
    private dataService: DataService,
    ) {}

    // private toast: Toast
  ngOnInit() {
    this.getAllInvoices();
  }
  // public get invoices(){
  //   return this.dataService.homePageInvoiceList;
  // }


  public getAllInvoices(): void {
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getAllInvoices().then(responseArray => this._homePageInvoiceList =responseArray);
        }
      });
  }

  // public searchInvoice(searchValue: string): void {
  //   const convertSearchValueToNumber = parseInt(searchValue);
  //   if (isNaN(convertSearchValueToNumber)) {
  //     this.dataService.searchInvoiceByCustomerName(searchValue);
  //   } else {
  //     this.dataService.searchInvoiceByInvoiceNumber(convertSearchValueToNumber);
  //   }
  // }

  // clearSearch(event){
  //   console.log('clearing search');
  //   console.log(event);
  //   this.getAllInvoices();
  // }

  titleClicked(){
    this.getAllInvoices();
  }
}

