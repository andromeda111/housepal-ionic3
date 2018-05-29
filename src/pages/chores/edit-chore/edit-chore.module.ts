import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChorePage } from './edit-chore';

@NgModule({
  declarations: [
    EditChorePage,
  ],
  imports: [
    IonicPageModule.forChild(EditChorePage),
  ],
})
export class EditChorePageModule {}
