import { Injectable, ErrorHandler } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Injectable()
export class ErrorService implements ErrorHandler {

    constructor(private alertCtrl: AlertController) { }

        handleError(error) {
            let title = 'Oops! Something went wrong!';

            switch (error.type) {
                case 'notice':
                    title = 'Notice'
                    break;
            }

            let alert = this.alertCtrl.create({
                title: title,
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
