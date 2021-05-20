/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Invoices, ItemAddedInNewInvoice } from 'src/app/models/data';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-view-invoice-in-readonly',
  templateUrl: './view-invoice-in-readonly.page.html',
  styleUrls: ['./view-invoice-in-readonly.page.scss'],
})
export class ViewInvoiceInReadonlyPage implements OnInit {
  private invoiceId: number;
  private _readOnlyInvoice: Invoices = new Invoices();
  private _itemsInInvoice: Array<ItemAddedInNewInvoice> = [];

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getInvoiceIdFromUrl();
    this.getInvoiceById(this.invoiceId);
    this.getItemsInReadOnlyInvoice(this.invoiceId);
  }

  public get readOnlyInvoice(): Invoices {
    return this._readOnlyInvoice;
  }

  public set readOnlyInvoice(value: Invoices) {
    this._readOnlyInvoice = value;
  }

  public get itemsInInvoice() {
    return this._itemsInInvoice;
  }

  public getInvoiceById(invoiceId: number): void {
    this.dataService.getInvoiceDetailsByInvoiceId(invoiceId).then(
      (invoice) => this.readOnlyInvoice = invoice);
  }

  private getItemsInReadOnlyInvoice(invoiceId: number): void {
    this.dataService.getItemsFromNewInvoice(invoiceId)
    .then(items => this._itemsInInvoice = items);
  }

  private getInvoiceIdFromUrl(): void {
    this.invoiceId = this.route.snapshot.params.id;
  }

}
