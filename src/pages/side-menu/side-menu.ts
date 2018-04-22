import { Component, Input, OnDestroy } from '@angular/core';
import { IonicPage, MenuController, NavController, Events } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import 'rxjs/add/operator/takeWhile';
import { AuthService } from '../../services/auth.service';
import { HouseService } from '../../services/house.service';
import { UserService } from '../../services/user.service';
import { AlertService } from '../../services/alert.service';
import { SigninPage } from '../user-setup/signin/signin';
import { EditProfilePage } from '../edit-profile/edit-profile';
import firebase from 'firebase';
import { ImageService } from '../../services/image.service';

@IonicPage()
@Component({
    selector: 'page-side-menu',
    templateUrl: 'side-menu.html'
})
export class SideMenuPage implements OnDestroy {

    activeMenu = 'Roommates';
    house: any = {};
    roommates: any = [];
    removeForm: FormGroup;
    profileImageUrl = '';
    profileImageDefault = '../../assets/imgs/profile_blank.png';

    private alive = true;

    @Input() userName = '';

    constructor(private authService: AuthService,
        private menuCtrl: MenuController,
        private nav: NavController,
        private houseService: HouseService,
        private userService: UserService,
        private alertService: AlertService,
        private events: Events,
        private imageService: ImageService) {

        this.houseService.menuDataSubject
            .takeWhile(() => this.alive)
            .subscribe(result => {
                if (!this.userService.activeUser.houseID) {
                    this.alertService.notInHouse();
                } else if (result.length) {
                    this.house = result[0];
                    this.roommates = result[1];
                    this.setUserProfileImage();
                }
            });

        this.events.subscribe('menu:action-initializeForm', () => this.initializeForm());
        this.events.subscribe('menu:action-setRoommates', (roommates: any[]) => this.roommates = roommates);

        this.initializeForm();
    }

    ngOnDestroy() {
        this.alive = false;
    }

    setUserProfileImage() {
        this.imageService.getProfileImageUrl(this.userService.activeUser.uid).then(url => {
            this.profileImageUrl = url;
        });
    }

    editProfile() {
        this.nav.push(EditProfilePage);
    }

    selectMenu(menu: string) {
        this.activeMenu === menu ? this.activeMenu = '' : this.activeMenu = menu;
    }

    private initializeForm() {
        let roommate = null;

        this.removeForm = new FormGroup({
            'roommate': new FormControl(roommate, Validators.required),
        });
    }

    leaveHouse() {
        this.alertService.leaveHouse(this.house.houseName);
    }

    removeFormSubmit() {
        const selectedRoommate = Object.assign({}, this.removeForm.value.roommate);
        this.alertService.removeRoommate(selectedRoommate, this.house.houseName);
    }

    signOut() {
        this.activeMenu = 'Sign Out';
        this.authService.logout();
        this.menuCtrl.close();
        this.nav.setRoot(SigninPage);
    }
}
