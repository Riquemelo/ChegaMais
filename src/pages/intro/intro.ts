import { Component } from '@angular/core';
import {  IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  slides = [
    {
      title: "<img id='title-intro' src='assets/imgs/logotipo1.png'> ",
      description: "Procurando algum evento do seu interesse?</p> <p>Veio ao lugar certo</p>",
      image: "assets/imgs/city.png",
    },
    {
      title: "O que isso faz?",
      description: "<b>Chega+</b> é aquele seu amigo que sempre sabe onde te levar naquele seu tempo livre quando você não aguenta mais ficar em casa",
      image: "",
    },
    {
      title: "Cada um tem seu jeito",
      description: "<b>Chega+</b> monitora eventos ao seu redor e os apresenta de uma maneira fácil e organizada para que aproveite eventos do seu jeito",
      image: "",
    },
    {
      title: "Mais rolês?",
      description: "Se conecte com o Facebook, e veja cada vez mais eventos de maneira rapida e unificada",
      image: "",
    }
  ];
  goToLoginPage(){
    this.navCtrl.push(LoginPage)
  }
}

