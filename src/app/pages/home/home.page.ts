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
  public searchText: string;
  private _homePageInvoiceList: Array<Invoices> = [];
  constructor(
    private dataService: DataService,
    private route: ActivatedRoute) {
    route.params.subscribe(() => this.getAllInvoices());
  }

  ngOnInit() {
  }

  /** Getter invoice @returns {invoices} */
  public get invoices(): Array<Invoices> {
    return this._homePageInvoiceList;
  }

  /** invoked whe title is clicked*/
  public titleClicked() {
    this.getAllInvoices();
  }

  /** Gets All the list of invoices */
  private getAllInvoices(): void {
    this.dataService.databaseState().subscribe((dbState) => {
      if (dbState) {
        this.dataService.getAllInvoices()
          .then(invoicesArray => this._homePageInvoiceList = invoicesArray);
      }
    });
  }
}

