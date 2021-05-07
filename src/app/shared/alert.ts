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

  //for customer information
  async presentAlertPromptForCustomerInfo() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class-customer',
      header: 'Enter Customer Name',
      inputs: [
        {
          name: 'firstName',
          type: 'text',
          placeholder: 'sanikumar'
        },
        {
          name: 'lastName',
          type: 'text',
          placeholder: 'sahani'
        },
      ],
      buttons: [
        {
          text: 'Submit',
          handler: (value) => {
            console.log('Confirm Ok');
            console.log(value.firstName+' '+ value.lastName);
          }
        }
      ]
    });

    await alert.present();
  }



}
