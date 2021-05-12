// /* eslint-disable no-underscore-dangle */
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Item } from 'src/app/models/data';
// import { DataService } from 'src/app/services/data.service';

// @Component({
//   selector: 'app-add-item',
//   templateUrl: './add-item.page.html',
//   styleUrls: ['./add-item.page.scss'],
// })
// export class AddItemPage implements OnInit {
//   private _itemForm: FormGroup;
//   constructor(
//     private formBuilder: FormBuilder,
//     private dataService: DataService
//   ) { }
//   ngOnInit(): void {
//     this.formData();
//   }

//   /** Getter itemForm used by template */
//   public get itemForm(): FormGroup {
//     return this._itemForm;
//   }

//   /**
//    * @param item is passed to dataService
//    */
//   public addItem(item: Item): void {
//     if (this.dataService.isItemPresentInStock(item.name)) {
//       this.dataService.addItemInStock(item);
//     } else {
//       //TODO: implementation pending
//     }
//   }

//   private formData(): void {
//     this._itemForm = this.formBuilder.group({
//       name: ['', [Validators.required]],
//       uom: ['', [Validators.required]],
//       price: [0, [Validators.required]],
//     });
//   }

// }
