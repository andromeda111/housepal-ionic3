import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { ChoreCardComponent } from './chore-card/chore-card.component';
import { ChoreFormComponent } from './chore-form/chore-form.component';

@NgModule({
    declarations: [
        ChoreCardComponent,
        ChoreFormComponent
    ],
    imports: [
        IonicModule
    ],
    exports: [
        ChoreCardComponent,
        ChoreFormComponent
    ]
})
export class ComponentsModule { }