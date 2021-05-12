// /* eslint-disable no-underscore-dangle */
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { Item } from 'src/app/models/data';
// import { DataService } from 'src/app/services/data.service';

// @Component({
//   selector: 'app-update-item',
//   templateUrl: './update-item.page.html',
//   styleUrls: ['./update-item.page.scss'],
// })
// export class UpdateItemPage implements OnInit {
//   private _updateForm: FormGroup;
//   private _itemId: number;
//   constructor(
//     private formBuilder: FormBuilder,
//     private route: ActivatedRoute,
//     private dataService: DataService
//   ) { }
//   ngOnInit(): void {
//     this.getItemById();
//     this.formData();
//   }

//   /** getter updateForm used by template */
//   public get updateForm(): FormGroup {
//     return this._updateForm;
//   }


//   /** Getter itemId used by template*/
//   public get itemId(): number {
//     return this._itemId;
//   }

//   /**
//    * @param item is the updated item
//    * @param itemId is the itemId of the item
//    */
//   updateItem(item: Item, itemId: number): void {
//     this.dataService.updateItemInStock(item, itemId);
//   }

//   /** Gets the itemId from the ActiveRouterLink */
//   private getItemById(): void {
//     this._itemId = this.route.snapshot.params.id;
//     this.dataService.getItemByItemIdFromStock(this._itemId);
//   }

//   /**This is the reactive FormData which will capture updated information*/
//   private formData() {
//     //implement the form later
//     this._updateForm = this.formBuilder.group({
//       name: ['onion', [Validators.required]],
//       uom: ['kg', [Validators.required]],
//       price: [50, [Validators.required]],
//     });
//   }
// }
