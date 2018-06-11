import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { HomePage } from '../home/home';
import { HomePageModule } from '../home/home.module';
import * as $ from 'jquery'


declare var google;
var distancia = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=Praia+Grande,SP&destinations=-23.969753,-46.333185&key=AIzaSyCg24vrqk4EoxnIW7pXw21Bg66o-1i3-aU'

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  eventos =
    [
      {
        eventID: 1,
        nome: 'Festa na Praça',
        coordenadas: '-23.969753,-46.333185',
        endereco: 'Praça das Bandeiras, Santos',
        mapsConfig:'zoom=15&size=450x300&maptype=terrain&markers=color:red%7Clabel:A%7C-23.969753,-46.333185&'
      },
      {
        eventID: 2,
        nome: 'Festa do Jeraudinhu',
        coordenadas: '-24.082692,-46.598718',
        endereco: 'Rua Coelho Neto, Praia Grande',
        mapsConfig:'zoom=15&size=450x300&maptype=terrain&markers=color:red%7Clabel:A%7C-24.082692,-46.598718&'
      }
    ];

  mapsStatic: string = 'https://maps.googleapis.com/maps/api/staticmap?'
  mapsStyle: string = 'style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360&';
  private APIkey: string = 'key=AIzaSyCrIAN1JYkaIJGwJPiUuyhVHr6kvV5ka_k';

  constructor(private geolocation: Geolocation, public navCtrl: NavController) { }

  ionViewDidLoad() {
    this.eventos.forEach(evento => {
      $(`#map${evento.eventID}`).append(`<img class='map-list' src="${this.mapsStatic}${evento.mapsConfig}${this.mapsStyle}${this.APIkey}">`);
    });
  }
}
  // CalculateAndDisplayRoute(start: String) {
  //   this.directionsService.route({
  //     origin: start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }