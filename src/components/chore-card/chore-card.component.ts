import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';

@Component({
    selector: 'chore-card',
    templateUrl: 'chore-card.component.html'
})
export class ChoreCardComponent {

    isMyChore = false;
    done = false;
    color: string;

    @Input() chore;

    constructor(private imageService: ImageService, private userService: UserService) { }

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

    edit(id) {
        console.log('edit');
    }


}