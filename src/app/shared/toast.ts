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
  async displayToast(message: string, color: string, position: any) {
    if (!this.isToastPresent) {
      this.isToastPresent = true;
      const toast = await this.toastController.create({
        message,
        position,
        duration: 1000,
        color,
      });
      toast.present();
      toast.onDidDismiss().then(() => (this.isToastPresent = false));
    }
  }
}
