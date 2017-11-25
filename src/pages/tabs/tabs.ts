import { Component } from '@angular/core';

import { MessageBoardPage } from '../message-board/message-board';
import { ChoresPage } from '../chores/chores';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { LaundryPage } from '../laundry/laundry';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = MessageBoardPage;
  tab2Root = ChoresPage;
  tab3Root = ShoppingListPage;
  tab4Root = LaundryPage;

  constructor() {

  }
}
