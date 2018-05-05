import { Component } from '@angular/core';
import { IonicPage, ActionSheetController, NavParams } from 'ionic-angular';
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

    constructor(private navParams: NavParams,
        private userService: UserService,
        private imageService: ImageService,
        private errorService: ErrorService,
        private actionSheetCtrl: ActionSheetController) {

        this.profileImageUrl = this.navParams.get('profileUrl');
    }

    /*=====================
       Edit Profile Image
    ======================*/
    getPhoto(sourceType: string) {
        this.imageService.getPhoto(sourceType, this.userService.activeUser.uid)
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
