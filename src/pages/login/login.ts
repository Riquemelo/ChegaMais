import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { RegisterPage } from '../register/register';

import { User } from '../../models/user';

import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  result;

  ErroMenssagem;

  user = {} as User;

  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    private alertCtrl: AlertController) {

  }


  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }
  goToTabsPage() {
    this.navCtrl.push(TabsPage);
  }

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  async login(user: User) {
    if (user.email != '' && user.password != '' && user.email != null)
      this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
        .then((returnedUser) => {

          console.log(returnedUser);

          this.goToTabsPage();
          this.alert('Sucesso! Você Logou');

        }).catch(function (error) {
          console.log(error);
        });
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }

}


