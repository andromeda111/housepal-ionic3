import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';

@Injectable()
export class ImageService {

    constructor(private camera: Camera,
        private userService: UserService) { }

    /*============================
        Profile Image Handlers
    =============================*/
    getProfileImageUrl(uid: string) {
        const imageRef = firebase.storage().ref().child(`userprofile/${uid}.jpg`);
        return imageRef.getDownloadURL().catch(() => {
            // Ignore error for default url
            return '../../assets/imgs/profile_blank.png';
        });;
    }

    /*============================
        Camera Photo and Upload
    =============================*/
    getPhoto(sourceType: string) {
        const options: CameraOptions = {
            quality: 90,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            targetWidth: 384,
            correctOrientation: true,
            sourceType: this.camera.PictureSourceType[sourceType]
        }

        return this.camera.getPicture(options).then((imageData) => {
            const imageBase64 = 'data:image/jpeg;base64,' + imageData;
            return this.upload(imageBase64);
        })
    }

    upload(imageBase64) {
        const uid = this.userService.activeUser.uid;
        const userImageRef = this.imageRefFactory(this.userService.activeUser.uid);

        return userImageRef.putString(imageBase64, 'data_url').then(snapshot => {
            return snapshot.downloadURL;
        })
    }

    /*==============
        Utility
    ================*/
    imageRefFactory(uid: string) {
        return firebase.storage().ref().child(`userprofile/${uid}.jpg`);
    }
}
