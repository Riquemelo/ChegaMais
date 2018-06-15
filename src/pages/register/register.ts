import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';

import { User } from '../../models/user';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  tituloErro = '';
  mesagemErro = '';

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goToHomePage() {
    this.navCtrl.push(HomePage);
  }

  // Alertas de erros

  alertaErro(mensagem) {
    if (mensagem.code == 'auth/argument-error') {
      this.tituloErro = 'Campos não inseridos';
      this.mesagemErro = 'Insira um valor nos campos';
    } else if (mensagem.code == 'auth/email-already-in-use') {
      this.tituloErro = 'Email em uso';
      this.mesagemErro = 'Esse email já está sendo usado';
    } else if (mensagem.code == 'auth/invalid-email') {
      this.tituloErro = 'Email inválido';
      this.mesagemErro = 'Insira um email válido';
    } else if (mensagem.code == 'auth/operation-not-allowed') {
      this.tituloErro = 'Email desabilitado';
      this.mesagemErro = 'Esse usuário esta desabilitato, contate o suporte para mais informações';
    } else if (mensagem.code == 'auth/weak-password') {
      this.tituloErro = 'Senha fraca';
      this.mesagemErro = 'Essa senha não é forte o suficiente';
    }else {
      this.tituloErro = mensagem.code;
      this.mesagemErro = mensagem.message;
    }
    let alert = this.alertCtrl.create({
      title: this.tituloErro,
      subTitle: this.mesagemErro,
      buttons: ['Dismiss']
    });
    alert.present();
  }


  async register(user: User) {
    try {
      const result = this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);

      let alert = this.alertCtrl.create({
        title: 'Registro feito com sucesso',
        message: 'Chega Mais ' + user.email + ' !!!' + result,
        buttons: [
          {
            text: 'Continuar',
            role: 'Continuar',
            handler: () => {
              this.goToHomePage();
            }
          }
        ]
      });
      alert.present();
      alert.onDidDismiss(() => {
        this.goToHomePage();
      })
    }
    catch (e) {
      this.alertaErro(e);//Chamando o alerta dos erros
    }
  }

}
