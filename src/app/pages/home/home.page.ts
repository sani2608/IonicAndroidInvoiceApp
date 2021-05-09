import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Invoices } from 'src/app/models/data';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //TODO: replace this with actual data from database.
  invoices = [
    {
      customerName: 'John Doe',
      date: 'April 25, 2021',
      totalItems: 10,
      totalPrice: 1000,
      invoiceId: 1000,

    },
    {
      customerName: 'Soumya',
      date: 'April 25, 2021',
      totalItems: 15,
      totalPrice: 1200,
      invoiceId: 1001,
    },
    {
      customerName: 'Girish',
      date: 'April 30, 2021',
      totalItems: 20,
      totalPrice: 1500,
      invoiceId: 1002,
    },
    {
      customerName: 'Sanikumar',
      date: 'May 3, 2021',
      totalItems: 35,
      totalPrice: 5600,
      invoiceId: 1003,
    },
    {
      customerName: 'Saurabh',
      date: 'May 3, 2021',
      totalItems: 30,
      totalPrice: 5000,
      invoiceId: 1004,
    },
  ];

  invoices$: Observable<Invoices[]>;
  private searchTerms = new Subject<string>();


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    console.log('CREATING DATABASE');
    this.dataService.createDatabase();
    console.log('DATABASE IS CREATED');
  }


  //* ALL THE FUNCTIONS TO BE IMPLEMENTED
  getAllInvoices(): void {
    this.dataService.getInvoices();
  }

  searchInvoice(searchValue: string): void {
    // eslint-disable-next-line radix
    const convertSearchValueToNumber = parseInt(searchValue);
    if (isNaN(convertSearchValueToNumber)) {
      this.dataService.searchInvoiceByCustomerName(searchValue);
    } else {
      this.dataService.searchInvoiceByInvoiceNumber(convertSearchValueToNumber);
    }
    // this.dataService.searchInvoices(val);
    // this.invoices$ = this.searchTerms.pipe(debounceTime(300),
    //   distinctUntilChanged(),
    //   switchMap((value: string | number) => this.dataService.searchInvoices(value)));
  }
}

