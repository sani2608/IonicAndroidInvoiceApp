import { NgModule } from '@angular/core';
import { ToastController } from '@ionic/angular';

@NgModule({})
export class Toast {
  private isToastPresent = false; //prevent multiple toast bar
  constructor(public toastController: ToastController) {}
  /**
   *
   * @param message pass message accordingly
   */
  async displayToast(message: string) {
    if (!this.isToastPresent) {
      this.isToastPresent = true;
      const toast = await this.toastController.create({
        message,
        position: 'top',
        duration: 1000,
        color: 'primary',
      });
      toast.present();
      toast.onDidDismiss().then(() => (this.isToastPresent = false));
    }
  }
}
