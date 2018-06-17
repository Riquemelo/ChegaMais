import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the IntroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class IntroPage {

  constructor(private storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad(){

  }
  slides = [
    {
      title: "Cada um tem seu jeito",
      description: "<b>Chega+</b> monitora eventos ao seu redor e os apresenta de uma maneira fácil e organizada para que aproveite eventos do seu jeito",
      image: "assets/imgs/intro3.png",
    },
    {
      title: "Mais rolês?",
      description: "Se conecte com o Facebook, e veja cada vez mais eventos de maneira rapida e unificada",
      image: "assets/imgs/intro2.png",
    }
  ];
  goToLoginPage(){
    this.navCtrl.push(LoginPage)
  }
}

