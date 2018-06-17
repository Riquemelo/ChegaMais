import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { Profile } from '../../models/profile';
import { Session } from '../../app/session';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public session: Session,
    private alertCtrl: AlertController,
    private app: App) {
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object('profile/${auth.uid}').set(this.profile)
        .then(() => this.navCtrl.setRoot('TabsPage'));
    })
  }

  goToIntroPage() {
    let nav = this.app.getRootNav();
    nav.push(IntroPage);
  }

showConfirm() {
  const confirm = this.alertCtrl.create({
    title: 'Não nos deixe :(',
    message: 'Tem certeza que quer sair?',
    buttons: [
      {
        text: 'Não',
        handler: () => {
          console.log('Disagree clicked');
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.session.remove();
          this.goToIntroPage();
        }
      }
    ]
  });
  confirm.present();
}
}
