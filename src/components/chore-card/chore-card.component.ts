import { Component, Input } from '@angular/core';

@Component({
    selector: 'chore-card',
    templateUrl: 'chore-card.component.html'
})
export class ChoreCardComponent {

    @Input() chore;
}