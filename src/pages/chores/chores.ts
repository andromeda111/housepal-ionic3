import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { HouseService } from '../../services/house.service';
import { ChoreService } from '../../services/chore.service';

@IonicPage()
@Component({
    selector: 'page-chores',
    templateUrl: 'chores.html'
})
export class ChoresPage {

    roommates = []
    allChores = []
    myChores = []
    otherChores = []

    profileUrlMap: any;

    constructor(private navCtrl: NavController,
                private userService: UserService,
                private houseService: HouseService,
                private choreService: ChoreService) { }

    ionViewWillEnter() {
        this.choreService.getAllChores()
            .subscribe((chores: any) => {
                console.log(chores);
                this.allChores = chores;

                this.myChores = chores.filter(chore => {
                    return chore.currentAssigned.uid === this.userService.activeUser.uid;
                });

                this.otherChores = chores.filter(chore => {
                    return chore.currentAssigned.uid !== this.userService.activeUser.uid;
                });
            });
    }

    editChore(chore) {
        console.log(chore);
        
        this.navCtrl.push('EditChorePage', chore);
    }
}
