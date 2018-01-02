import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoresPage } from './chores';

@NgModule({
  declarations: [
    ChoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoresPage),
  ],
})
export class ChoresPageModule {}