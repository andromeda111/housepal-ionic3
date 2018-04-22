import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
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

    constructor(private userService: UserService,
                private imageService: ImageService,
                private errorService: ErrorService) { }

    /*======================
        LifeCycle Hooks
    ========================*/
    ionViewWillEnter() {
        // Set User Profile Image
        this.imageService.getProfileImageUrl(this.userService.activeUser.uid).then(url => {
            this.profileImageUrl = url;
        });
    }

    /*=============
        Actions
    ===============*/
    takeProfilePhoto() {
        this.imageService.takeProfilePhoto().then(url => {
            this.profileImageUrl = url;
        })
        .catch((err) => {
            if (!err.error || !err.error.message) {
                err = { error: { message: 'There was a problem uploading. Please try again.' } }
            }

            this.errorService.handleError(err);
        })
    }
  
}
