/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  public get invoices(): Array<Invoices> {
    return this._homePageInvoiceList;
  }



  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
  ) {
    route.params.subscribe(() => {

      this.getAllInvoices();
      console.log('Inside Constructor of  home..');
    });
  }

  // private toast: Toast
  ngOnInit() {
  }
  // public get invoices(){
  //   return this.dataService.homePageInvoiceList;
  // }


  public getAllInvoices(): void {
    this.dataService.databaseState()
      .subscribe((response) => {
        if (response) {
          this.dataService.getAllInvoices().then(responseArray => this._homePageInvoiceList = responseArray);
        }
      });
  }

  titleClicked() {
    this.getAllInvoices();
  }
}

