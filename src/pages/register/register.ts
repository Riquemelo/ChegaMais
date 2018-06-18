import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AlertController } from 'ionic-angular';
import { Session } from '../../app/session';
import { User } from '../../models/user';
import { Profile } from '../../models/profile';

import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

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

  profile = {} as Profile;

  user = {} as User;

  tituloErro = '';
  mesagemErro = '';

  constructor(
    public afDatabase: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController,
    public session: Session) {
  }

  goToLoginPage() {
    this.navCtrl.push(LoginPage);
  }

  goToTabsPage() {
    this.navCtrl.push(TabsPage);
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
    } else {
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
    if (user.email != '' && user.password != '' && user.email != null)
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then((result) => {
          this.afAuth.authState.take(1).subscribe(auth => {
            this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
              .then((result2) => {
                console.log(result);
                console.log(result2);

                let alert = this.alertCtrl.create({
                  title: 'Registro feito com sucesso',
                  message: 'Chega Mais ' + user.email + ' !!!',
                  buttons: [
                    {
                      text: 'Continuar',
                      role: 'Continuar',
                      handler: () => {
                        this.goToTabsPage();
                      }
                    }
                  ]
                });
                alert.present();
                alert.onDidDismiss(() => {
                  this.session.create(user.email);
                  this.goToTabsPage();
                })

              }).catch(function (error) {
                console.log(error);
              });
          })}).catch(function (error) {
            console.log(error);
          });
  }

}
