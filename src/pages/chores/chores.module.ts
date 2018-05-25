import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoresPage } from './chores';
import { ChoreCardComponent } from '../../components/chore-card/chore-card.component';

@NgModule({
  declarations: [
    ChoresPage,
    ChoreCardComponent
  ],
  imports: [
    IonicPageModule.forChild(ChoresPage)  
  ],
  entryComponents: [
    ChoreCardComponent
  ]
})
export class ChoresPageModule {}