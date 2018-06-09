import { Component } from '@angular/core';

import { ProfilePage } from '../profile/profile';
import { FeedPage } from '../feed/feed';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ProfilePage;
  tab2Root:string = 'HomePage';
  tab3Root = FeedPage;

  constructor() {

  }
}
