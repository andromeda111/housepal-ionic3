import { Component } from '@angular/core';
import { IonicPage, ActionSheetController } from 'ionic-angular';
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
        private errorService: ErrorService,
        private actionSheetCtrl: ActionSheetController) { }

    /*======================
        LifeCycle Hooks
    ========================*/
    ionViewWillEnter() {
        // Set User Profile Image
        this.imageService.getProfileImageUrl(this.userService.activeUser.uid).then(url => {
            this.profileImageUrl = url;
        });
    }

    /*=====================
       Edit Profile Image
    ======================*/
    getPhoto(sourceType: string) {
        this.imageService.getPhoto(sourceType)
            .then(url => {
                if (!url) {
                    return;
                }
                this.profileImageUrl = url;
            })
    }

    selectImageSource() {
        let actionSheet = this.actionSheetCtrl.create({
            title: 'Select Image Source',
            buttons: [
                {
                    text: 'Camera',
                    icon: 'camera',
                    handler: () => {
                        this.getPhoto('CAMERA');
                    }
                }, {
                    text: 'Image Gallery',
                    icon: 'images',
                    handler: () => {
                        this.getPhoto('PHOTOLIBRARY');
                    }
                }, {
                    text: 'Cancel',
                    role: 'cancel'
                }
            ]
        });
        actionSheet.present();
    }
}
