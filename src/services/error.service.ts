import { Injectable, ErrorHandler } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService implements ErrorHandler {

    constructor(private alertCtrl: AlertController) { }

        handleError(error) {
            let alert = this.alertCtrl.create({
                title: 'Oops! Something went wrong!',
                subTitle: `Status: ${error.status}`,
                message: error.error.message,
                buttons: [
                    {
                        text: 'Okay',
                        role: 'cancel',
                    }
                ]
            });

            alert.present();
        }
   
}
