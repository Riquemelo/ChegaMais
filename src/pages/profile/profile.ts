import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IntroPage } from '../intro/intro';
import { Profile } from '../../models/profile';
import { Session } from '../../app/session';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { App } from 'ionic-angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  profileData: AngularFireObject<Profile>;

  items: Observable<any>;


  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public session: Session,
    private alertCtrl: AlertController,
    private app: App) {
      
    this.items = afDatabase.object('profile/YW7Qyurq0QWgeQEsemURQWwStAp2').valueChanges();

  }

  ionViewDidLoad() {
    this.afAuth.authState.take(1).subscribe(auth => {
      //console.log(auth);
      this.items = this.afDatabase.object(`profile/${auth.uid}`).valueChanges();
    })

  }

  goToIntroPage() {
    let nav = this.app.getRootNav();
    nav.push(IntroPage);
  }

  getDataFromFireBse(){
    this.afAuth.authState.take(1).subscribe(auth => {
      console.log(auth);
    })
     
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
