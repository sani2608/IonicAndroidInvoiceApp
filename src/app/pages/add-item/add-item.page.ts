import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {

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
  addItem(): void {
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
