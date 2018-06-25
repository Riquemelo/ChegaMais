import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, ToastController, NavParams } from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { EventoPage } from '../evento/evento';

declare var google;

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('mapHome') mapElement: ElementRef;
  private map: any;
  public myLtdLgt;
  private directionsService = new google.maps.DirectionsService;
  private directionsDisplay = new google.maps.DirectionsRenderer;
  public PATH = "evento/";

  constructor(private afAuth: AngularFireAuth, private toast: ToastController, private geolocation: Geolocation, public navCtrl: NavController, private db: AngularFireDatabase) { }
  ionViewDidEnter() {
    this.actualLocation();
  }

  actualLocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.initMap(resp.coords.latitude, resp.coords.longitude, this.navCtrl );
    }).catch((error) => {
      console.log('Error getting location', error);
      this.initMap(0, 0, this.navCtrl);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });
  }
  
  initMap(actualLatitude, actualLongitude, navCtrl) {
    let myLtdLgt = { lat: actualLatitude, lng: actualLongitude };
    let zoom: number = (actualLatitude == 0 && actualLongitude == 0) ? 1 : 14;
    this.myLtdLgt = { lat: actualLatitude, lng: actualLongitude };
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: zoom,
      styles: [
        {
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.icon",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#212121"
            }
          ]
        },
        {
          "featureType": "administrative",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "administrative.country",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#9e9e9e"
            }
          ]
        },
        {
          "featureType": "administrative.land_parcel",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "administrative.locality",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#bdbdbd"
            }
          ]
        },
        {
          "featureType": "administrative.neighborhood",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "poi",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#181818"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "poi.park",
          "elementType": "labels.text.stroke",
          "stylers": [
            {
              "color": "#1b1b1b"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "geometry.fill",
          "stylers": [
            {
              "color": "#2c2c2c"
            }
          ]
        },
        {
          "featureType": "road",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#8a8a8a"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#373737"
            }
          ]
        },
        {
          "featureType": "road.arterial",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#3c3c3c"
            }
          ]
        },
        {
          "featureType": "road.highway",
          "elementType": "labels",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.highway.controlled_access",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#4e4e4e"
            }
          ]
        },
        {
          "featureType": "road.local",
          "stylers": [
            {
              "visibility": "off"
            }
          ]
        },
        {
          "featureType": "road.local",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#616161"
            }
          ]
        },
        {
          "featureType": "transit",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#757575"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [
            {
              "color": "#000000"
            }
          ]
        },
        {
          "featureType": "water",
          "elementType": "labels.text.fill",
          "stylers": [
            {
              "color": "#3d3d3d"
            }
          ]
        }],
      center: this.myLtdLgt,
      disableDefaultUI: true,
    });
    let marker = (actualLatitude != 0 || actualLongitude != 0) ? new google.maps.Marker({
      position: this.myLtdLgt,
      map: this.map,
      title: 'Você está aqui',
      icon: '../../assets/icon/blue-dot.png'
    }) : undefined;
    this.directionsDisplay.setMap(this.map);

    let eventos: Observable<any>;
    let categoria = ['festa/', 'games/', 'infantil/', 'literario/', 'religioso/', 'role/'];
    let markerEvento = [];

    for (let cat of categoria) {
      eventos = this.getCoords(cat);

      eventos.forEach(evt => {
        evt.forEach(evtUnico => {
          let latlong = evtUnico.coord.split(",");
          let latitude = parseFloat(latlong[0]);
          let longitude = parseFloat(latlong[1]);
          
          markerEvento[evtUnico.key] = new google.maps.Marker({
            position: {lat: latitude, lng: longitude},
            map: this.map,
            title: evtUnico.nome,
            icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
          });

          markerEvento[evtUnico.key].setMap(this.map);

        });
        
      })
    }  

  }

  getCoords(categoria) {
    return this.db.list(this.PATH + categoria)
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
  // http://maps.google.com/mapfiles/ms/icons/green-dot.png 
  // http://maps.google.com/mapfiles/ms/icons/blue-dot.png 
  // http://maps.google.com/mapfiles/ms/icons/red-dot.png
  // http://maps.google.com/mapfiles/ms/icons/yellow-dot.png
  // ionViewWillLoad() {
  //   this.afAuth.authState.subscribe(data => {
  //     if (data && data.email && data.uid) {
  //       this.toast.create({
  //         message: 'Bem Vindo Ao ChegaMais',
  //         duration: 3000
  //       }).present();

  //     }
  //     else {
  //       this.toast.create({
  //         message: 'Email ou senha invádilidos',
  //         duration: 3000
  //       }).present();
  //     }
  //   })

  // }


}
