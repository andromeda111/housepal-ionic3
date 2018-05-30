import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'chore-card',
    templateUrl: 'chore-card.component.html'
})
export class ChoreCardComponent {

    isMyChore = false;
    done = false;
    color: string;

    @Input() chore;
    @Output() edit = new EventEmitter<any>();

    constructor(private imageService: ImageService, private userService: UserService, private nav: NavController) { }

    ngAfterContentInit() {
        this.isMyChore = this.chore && this.chore.currentAssigned.uid === this.userService.activeUser.uid
            ? true
            : false;

        switch (this.chore.done) {
            case true:
                this.color = 'green';
                break;
            case false:
                this.color = !this.chore.late ? 'blue' : 'red';
                break;
            default:
                this.color = 'blue';
                break;
        }

        if (this.chore.done) {
            this.done = true;
        }
    }

    markDone(id) {
        console.log('hit');
        this.done = true;
        this.color = 'green';
    }

    clickEdit(id) {
        console.log('edit');
        this.nav.push('EditChorePage');
    }
}
