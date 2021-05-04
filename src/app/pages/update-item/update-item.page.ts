import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.page.html',
  styleUrls: ['./update-item.page.scss'],
})
export class UpdateItemPage implements OnInit {

  private itemForm: FormGroup;
  constructor(
    // private service: ItemService,
    private formBuilder: FormBuilder,
    // private toast: ToastExample
  ) { }
  ngOnInit(): void {
    /**
     * Reactive Form
     */
    this.itemForm = this.formBuilder.group({
      name: ['onion', [Validators.required]],
      quantity: [5, [Validators.required]],
      uom: ['kg', [Validators.required]],
      price: [50, [Validators.required]],
    });
  }
  get formData() {
    return this.itemForm;
  }

  /**
   * This method is used to pass formData to service.
   */
  updateItem(): void {
    //TODO: Implement updateItem() function.
    // if (!this.service.isItemPresent(this.itemForm.value.name)) {
    //   this.service.addData(this.itemForm.value);
    //   this.toast.displayToast(
    //     `${this.itemForm.value.name} added successfully.`
    //   );
    // } else {
    //   this.toast.displayToast(
    //     `${this.itemForm.value.name} already added in cart goto cart.`
    //   );
    // }
  }

}
