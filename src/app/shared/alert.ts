import { NgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';

@NgModule({})
export class Alert {

  constructor(public alertController: AlertController) { }

  async presentAlertPrompt(header: string, inputs?: any, buttons?: any) {
    const alert = await this.alertController.create({
      cssClass: 'alert-class',
      header,
      inputs,
      buttons,
    });

    await alert.present();
  }



}
