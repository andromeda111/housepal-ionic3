import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { ErrorService } from './error.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Injectable()
export class ImageService {

    constructor(private camera: Camera, private userService: UserService, private errorService: ErrorService) { }

    /*============================
        Camera Photo and Upload
    =============================*/
    takeProfilePhoto() {
        const options: CameraOptions = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 576,
            correctOrientation: true
        }

        return this.camera.getPicture(options).then((imageData) => {
            const imageBase64 = 'data:image/jpeg;base64,' + imageData;
            return this.upload(imageBase64);
        })
    }

    upload(imageBase64) {
        const userImageRef = this.imageRefFactory(this.userService.activeUser.uid);

        return userImageRef.putString(imageBase64, 'data_url').then(snapshot => {
            return snapshot.downloadURL;
        })
    }

    imageRefFactory(uid: string) {
        return firebase.storage().ref().child(`userprofile/${ uid }.jpg`);
    }
}
