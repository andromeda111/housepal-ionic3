import { Component, Input } from '@angular/core';
import { ImageService } from '../../services/image.service';

@Component({
    selector: 'chore-card',
    templateUrl: 'chore-card.component.html'
})
export class ChoreCardComponent {

    @Input() chore;

    constructor(private imageService: ImageService) {}

    // sourceProfileUrl(uid) {
    //     return this.imageService.profileUrlMap[uid] ? this.imageService.profileUrlMap[uid] : 'assets/imgs/profile_blank.png';
    // }
}