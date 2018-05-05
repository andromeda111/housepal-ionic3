import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { ErrorService } from './error.service';

@Injectable()
export class ImageService {

    _profileUrlMap: any = {};

    get profileUrlMap() {
        return this._profileUrlMap;
    }


    constructor(private camera: Camera,
        private errorService: ErrorService) { }

    setProfileUrlMap(uid: string, url: string) {
        this._profileUrlMap[uid] = url;
    }

    /*============================
        Profile Image Handlers
    =============================*/
    getProfileImageUrl(uid: string) {
        const imageRef = firebase.storage().ref().child(`userprofile/${uid}.jpg`);
        imageRef.getDownloadURL().catch(() => {
            // Ignore error for default url
            return 'assets/imgs/profile_blank.png';
        }).then(res => {
            this.setProfileUrlMap(uid, res);
        });
    }

    /*============================
        Camera Photo and Upload
    =============================*/
    getPhoto(sourceType: string, uid: string) {
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
            if (!imageData) {
                return;
            }
            const imageBase64 = 'data:image/jpeg;base64,' + imageData;
            return this.upload(imageBase64, uid);
        })
    }

    upload(imageBase64, uid) {
        const userImageRef = this.imageRefFactory(uid);

        return userImageRef.putString(imageBase64, 'data_url')
            .then(snapshot => {
                this.setProfileUrlMap(uid, snapshot.downloadURL);
                return snapshot.downloadURL;
            }).catch((err) => {
                if (!err.error || !err.error.message) {
                    err = { error: { message: 'There was a problem uploading. Please try again.' } }
                }

                this.errorService.handleError(err);
                return;
            })
    }

    /*==============
        Utility
    ================*/
    imageRefFactory(uid: string) {
        return firebase.storage().ref().child(`userprofile/${uid}.jpg`);
    }
}
