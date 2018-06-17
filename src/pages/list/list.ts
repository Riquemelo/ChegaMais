import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery'
import { EventoPage } from '../evento/evento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedPage } from '../feed/feed'

let categoria
declare var google;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  check = false;
  private PATH = "evento/";
  eventos: Observable<any>;

  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    categoria = navParams.get('Categoria') + "/";
    this.PATH += categoria;
    this.eventos = this.getAll(); 
  }

  ionViewDidEnter() {
    this.check = true;
  }

  goToEventoPage(key) {
    this.check = false;
    this.navCtrl.push(EventoPage, {
      Path: this.PATH,
      Key: key
    });
  }

  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }

  ionViewDidLeave(){
    if(this.check) this.navCtrl.setRoot(FeedPage);
  }
 
 
  // save(contact: any) {
  //   return new Promise((resolve, reject) => {
  //     if (contact.key) {
  //       this.db.list(this.PATH)
  //         .update(contact.key, { name: contact.name, tel: contact.tel })
  //         .then(() => resolve())
  //         .catch((e) => reject(e));
  //     } else {
  //       this.db.list(this.PATH)
  //         .push({ name: contact.name, tel: contact.tel })
  //         .then(() => resolve());
  //     }
  //   })
  // }
 
  // remove(key: string) {
  //   return this.db.list(this.PATH).remove(key);
  // }
}