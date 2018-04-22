import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { UserService } from '../../services/user.service';
import { ErrorService } from '../../services/error.service';
import { ImageService } from '../../services/image.service';

@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html'
})
export class EditProfilePage {

    profileImageUrl = '../../assets/imgs/profile_blank.png';

    private userImageRef: any;

    testvalue:any = '';

    constructor(private camera: Camera, private userService: UserService, private imageService: ImageService, private errorService: ErrorService) { 
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

    takeProfilePhoto() {
        this.imageService.takeProfilePhoto().then(res => {
            this.testvalue = res;
            this.profileImageUrl = res;
        })
        .catch((err) => {
            if (!err.error || !err.error.message) {
                err = { error: { message: 'There was a problem uploading. Please try again.' } }
            }

            this.errorService.handleError(err);
        })
    }
    
}
