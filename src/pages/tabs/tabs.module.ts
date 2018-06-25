import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabsPage } from './tabs';
import { SideMenuPage } from '../side-menu/side-menu';

@NgModule({
  declarations: [
    TabsPage,
    SideMenuPage
  ],
  imports: [
    IonicPageModule.forChild(TabsPage)
  ]
})
export class TabsPageModule { }