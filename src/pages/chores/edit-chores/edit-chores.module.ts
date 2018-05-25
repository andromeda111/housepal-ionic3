import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChoresPage } from './edit-chores';

@NgModule({
  declarations: [
    EditChoresPage
  ],
  imports: [
    IonicPageModule.forChild(EditChoresPage)
  ],
})
export class EditChoresPageModule {}