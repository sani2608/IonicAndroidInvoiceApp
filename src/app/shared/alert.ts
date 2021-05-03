import { NgModule } from '@angular/core';
import { AlertController } from '@ionic/angular';

@NgModule({})
export class Alert {

  constructor(public alertController: AlertController) { }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Enter Quantity',
      inputs: [
        {
          name: 'quantity',
          type: 'number',
          placeholder: '00'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (value) => {
            console.log('Confirm Ok');
            console.log(value);
            return value.quantity;
          }
        }
      ]
    });

    await alert.present();
  }



}
