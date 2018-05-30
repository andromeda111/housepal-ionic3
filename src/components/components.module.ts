import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChoreCardComponent } from './chore-card/chore-card.component';

@NgModule({
    declarations: [
        ChoreCardComponent,
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ChoreCardComponent
    ]
})
export class ComponentsModule { }