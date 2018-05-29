import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChoresPage } from './chores';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ChoresPage,
  ],
  imports: [
    IonicPageModule.forChild(ChoresPage),
    ComponentsModule
  ]
})
export class ChoresPageModule { }