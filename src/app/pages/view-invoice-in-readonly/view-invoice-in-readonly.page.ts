/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoices } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-invoice-in-readonly',
  templateUrl: './view-invoice-in-readonly.page.html',
  styleUrls: ['./view-invoice-in-readonly.page.scss'],
})
export class ViewInvoiceInReadonlyPage implements OnInit {



  private invoiceId: number;
  private _readOnlyInvoice: Invoices = new Invoices();


    /**
     * Getter readOnlyInvoice @return {Invoices}
     */
	public get readOnlyInvoice(): Invoices {
		return this._readOnlyInvoice;
	}

  public get itemsInInvoice() {
    return this.dataService.itemsAddedInNewInvoice;
  }



  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInvoiceIdFromUrl();
    this.getInvoiceById(this.invoiceId);
    this.dataService.getItemsFromNewInvoice(this.invoiceId);
  }





  public getInvoiceById(invoiceId: number): void {
    this.dataService.getInvoiceDetailsByInvoiceId(invoiceId).then((res) => {
      this.readOnlyInvoice.customerFullName = res.customerFullName;
      this.readOnlyInvoice.createdDate = res.createdDate;
      this.readOnlyInvoice.invoiceId = res.invoiceId;
      this.readOnlyInvoice.totalItems = res.totalItems;
      this.readOnlyInvoice.totalPrice = res.totalPrice;
      console.log('inv details from view only invoice...',this.readOnlyInvoice);
    });
  }

  private getInvoiceIdFromUrl(): void {
    this.invoiceId = this.route.snapshot.params.id;
  }

}
