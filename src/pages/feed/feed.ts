import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ListPage } from '../list/list';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html'
})
export class FeedPage {

  constructor(public navCtrl: NavController) {

  }

goToListPage(categoria: string){
  this.navCtrl.push('ListPage', {
    Categoria: categoria
  });
}

}
