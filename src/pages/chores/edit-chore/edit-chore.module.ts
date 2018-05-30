import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditChorePage } from './edit-chore';
import { ChoreFormComponent } from '../../../components/chore-form/chore-form.component';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    EditChorePage,
  ],
  imports: [
    IonicPageModule.forChild(EditChorePage),
    ComponentsModule
  ]
})
export class EditChorePageModule {}
