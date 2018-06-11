import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as $ from 'jquery';

let evento;

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  
  mapsStatic: string = 'https://maps.googleapis.com/maps/api/staticmap?'
  mapsStyle: string = 'style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Celement:labels%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text%7Cvisibility:off&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.business%7Cvisibility:off&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text%7Cvisibility:off&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels%7Cvisibility:off&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d&size=480x360&';
  private APIkey: string = 'key=AIzaSyCrIAN1JYkaIJGwJPiUuyhVHr6kvV5ka_k';

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    evento = navParams.get('Evento');
  }

  ionViewDidEnter() {
    $(`#mapa_evento`).append(`<img class='map-list' src="${this.mapsStatic}${evento.mapsConfig}${this.mapsStyle}${this.APIkey}">`);
    $('#info_evento').append(`<div class="title-event"><h2>${evento.nome}</h2></div><div class="endereco-event"><p>${evento.endereco}</p></div><a href="" class="facebook">Veja este evento no Facebook</a>`);
    $('#desc_evento').append(`<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nulla ante, euismod eget euismod in, bibendum eu elit. Nuncodio augue, consequat vulputate scelerisque nec, egestas volutpat dolor. Vivamus vehicula suscipit quam vitae lobortis.Maecenas sit amet leo fermentum, pellentesque odio quis, auctor ex. Maecenas vel pharetra mi. Maecenas pulvinar sollicitudinjusto, ac vulputate ligula. Proin eu neque aliquam nunc viverra lobortis. Nam nec viverra leo. Donec libero felis,mattis ac fermentum volutpat, porta sed nibh. Pellentesque non posuere urna. In felis tortor, cursus quis nunc in,pretium accumsan erat. Curabitur mollis dolor ut lectus ultricies congue tristique ut mi. Nullam vel neque blandit,aliquet arcu vel, scelerisque risus. Nunc tristique eros massa, eu aliquam metus maximus ut.</p>`)
  }
  
}
