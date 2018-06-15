import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import * as $ from 'jquery'
import { EventoPage } from '../evento/evento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

let categoria
declare var google;

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  private PATH = "evento/";
  eventos: Observable<any>;

  mapsStatic: string = 'https://maps.googleapis.com/maps/api/staticmap?';
  mapsConfig: 'zoom=15&size=450x300&maptype=terrain&markers=color:red%7Clabel:A%7C';
  mapsStyle: string = 'style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360&';
  private APIkey: string = 'key=AIzaSyCrIAN1JYkaIJGwJPiUuyhVHr6kvV5ka_k';


  constructor(private db: AngularFireDatabase, private geolocation: Geolocation, public navCtrl: NavController, public navParams: NavParams) {
    categoria = navParams.get('Categoria');
    this.PATH += categoria;
    this.eventos = this.getAll(); 
    console.log(this.eventos);
  }

  ionViewDidEnter() {    
      this.eventos.forEach(evento => {
        $(`#map${evento.key}`).append(`<img class='map-list' src="${this.mapsStatic}${evento.mapsConfig}${evento.coord}&${this.mapsStyle}${this.APIkey}">`);
      });
  }

  goToEventoPage(id) {
    this.navCtrl.push(EventoPage);
  }

  getAll() {
    return this.db.list(this.PATH)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, data : c.payload.val() }));
      })
  }
 
  // get(key: string) {
  //   return this.db.object(this.PATH + key).snapshotChanges()
  //     .map(c => {
  //       return { key: c.key, ...c.payload.val() };
  //     });
  // }
 
  save(contact: any) {
    return new Promise((resolve, reject) => {
      if (contact.key) {
        this.db.list(this.PATH)
          .update(contact.key, { name: contact.name, tel: contact.tel })
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push({ name: contact.name, tel: contact.tel })
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }
}