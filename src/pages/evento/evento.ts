import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Navbar } from 'ionic-angular';
import * as $ from 'jquery';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { FeedPage } from '../feed/feed'
import { ViewChild } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {
  @ViewChild(Navbar) navBar: Navbar;
  private PATH;
  private key;
  evento: any;
  check: boolean = false;

  constructor(private db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    this.PATH = navParams.get('Path');
    this.key = navParams.get('Key');
    this.evento = this.get(this.key); 
    this.evento.subscribe(event => this.evento = event);
  }

  ionViewDidEnter() {
    console.log(this.evento);
    this.check = true;
    this.navBar.backButtonClick = (e:UIEvent)=>{
      this.check = false;
      this.navCtrl.pop();
     }
  }

  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(obj => {
        console.log(obj.payload.val());
        return { key: obj.key, ...obj.payload.val() };
      });
  }

  ionViewDidLeave(){
    if(this.check) this.navCtrl.setRoot(FeedPage);
   }
  
}
