import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery'
import { EventoPage } from '../evento/evento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedPage } from '../feed/feed'
import { AddEventPage } from '../add-event/add-event'

declare let google;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  check = false;
  private PATH = "evento/";
  eventos: Observable<any>;
  categoria;

  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    this.categoria = navParams.get('Categoria');
    this.PATH += this.retiraAcentos(this.categoria.toLowerCase()) + "/";
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

  ionViewDidLeave() {
    if (this.check) this.navCtrl.setRoot(FeedPage);
  }

  insertEvent(Path: string) {
    this.check = false;
    this.navCtrl.push(AddEventPage, {
      Path: this.PATH,
    });
  }

  retiraAcentos(str) {

    let com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
    let sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";
    let novastr = "";
    for (let i = 0; i < str.length; i++) {
      let troca = false;
      for (let a = 0; a < com_acento.length; a++) {
        if (str.substr(i, 1) == com_acento.substr(a, 1)) {
          novastr += sem_acento.substr(a, 1);
          troca = true;
          break;
        }
      }
      if (troca == false) {
        novastr += str.substr(i, 1);
      }
    }
    return novastr;
  }

  // remove(key: string) {
  //   return this.db.list(this.PATH).remove(key);
  // }
}