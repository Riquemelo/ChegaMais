import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AddEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-event',
  templateUrl: 'add-event.html',
})
export class AddEventPage {
  API_KEY: string = "AIzaSyCrIAN1JYkaIJGwJPiUuyhVHr6kvV5ka_k";
  response = null;
  PATH: string = ""; 

  constructor(private db: AngularFireDatabase ,private nativeGeocoder: NativeGeocoder, public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.PATH = navParams.get("Path");
  }

  ionViewDidLoad() {

  }
  getLatLng(endereco) {
    endereco = encodeURIComponent(endereco);
    let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + endereco + "&sensor=false&key=" + this.API_KEY;
    this.http.get(url)
      .map(data => data.json())
      .subscribe(parsed_data => {
        this.response = parsed_data.results[0].geometry.location;
        return `${this.response.lat},${this.response.lng}`;
      });
  }
  insertEvent() {

    let nome = $("#nome_evento").val(); let desc = $("#desc_evento").val();
    let data = $("#data_evento").val(); let endereco = $("#endereco_evento").val();
    let hora = $("#hora_evento").val(); let coord = this.getLatLng(endereco);

    let evento = { nome, data, hora, desc, endereco, coord }

    this.save(nome, data, hora, desc, endereco, coord);

  }

  save(nome, data, hora, desc, endereco, coord) {
    return new Promise((resolve, reject) => {
        this.db.list(this.PATH)
          .push({ nome: nome, data: data, hora: hora, desc: desc, endereco: endereco, coord: coord})
          .then(() => resolve());
    })
  }
}
