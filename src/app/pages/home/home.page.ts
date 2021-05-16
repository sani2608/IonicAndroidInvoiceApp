import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {


  constructor(
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.getAllInvoices();
  }
  public get invoices(){
    return this.dataService.homePageInvoiceList;
  }


  public getAllInvoices(): void {
    this.dataService.databaseState()
      .subscribe((response) => {
        console.log('getting invoice on homepage .....\n', response);
        if (response) {
          this.dataService.getAllInvoices();
        }
      });
  }

  public searchInvoice(searchValue: string): void {
    // eslint-disable-next-line radix
    const convertSearchValueToNumber = parseInt(searchValue);
    if (isNaN(convertSearchValueToNumber)) {
      this.dataService.searchInvoiceByCustomerName(searchValue);
    } else {
      this.dataService.searchInvoiceByInvoiceNumber(convertSearchValueToNumber);
    }
  }

  clearSearch(event){
    console.log('clearing search');
    console.log(event);
    this.getAllInvoices();
  }

  titleClicked(){
    this.getAllInvoices();
  }
}

