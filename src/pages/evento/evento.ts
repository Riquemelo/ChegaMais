import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedPage } from '../feed/feed'


@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  
  private PATH;
  private key;
  evento: Observable<any>;

  constructor( private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.PATH = navParams.get('Path');
    this.key = navParams.get('Key') + "/";
    this.evento = this.getOnly(this.key); 
  }

  ionViewDidEnter() {
    console.log(this.evento);
  }

  getOnly(key: string) {
    return this.db.list(this.PATH + key)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  ionViewDidLeave(){
    this.navCtrl.setRoot(FeedPage);
   }
  
}
