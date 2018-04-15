import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {

    constructor(public loadingCtrl: LoadingController) { }

    loadingSpinner() {
        const loader = this.loadingCtrl.create({
          content: 'Please wait...'
        });
      
        return loader;
      }
}
