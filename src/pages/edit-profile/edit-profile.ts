import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

    profileImageUrl = '../../assets/imgs/profile_blank.png';

    private userImageRef: any;

    constructor(private camera: Camera, private userService: UserService, private errorService: ErrorService) { 
        this.userImageRef = firebase.storage().ref().child(`userprofile/${this.userService.activeUser.uid}.jpg`);
    }

    ionViewWillEnter() {
        this.setProfileImage();
    }

    setProfileImage() {
        this.userImageRef.getDownloadURL().then(url => {
            this.profileImageUrl = url;
        })
        .catch(error => {
            this.profileImageUrl = '../../assets/imgs/profile_blank.png';
        });
    }

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

        this.camera.getPicture(options).then((imageData) => {
            const imageBase64 = 'data:image/jpeg;base64,' + imageData;
            this.upload(imageBase64);
        })
        .catch(err => {
            if (!err.error.message) {
                err.error = { message: 'There was a problem uploading. Please try again.' };
            }

            this.errorService.handleError(err);
        })
    }

    upload(imageBase64) {
        this.userImageRef.putString(imageBase64, 'data_url').then(snapshot => {
            this.profileImageUrl = snapshot.downloadURL;
        })
        .catch(err => {
            if (!err.error.message) {
                err.error = { message: 'There was a problem uploading. Please try again.' };
            }

            this.errorService.handleError(err);
        });
    }
}
