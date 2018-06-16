import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Profile } from '../../models/profile';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})

export class ProfilePage {

  profile = {} as Profile;

  constructor(
    public navCtrl: NavController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase) {
  }

  createProfile() {
    this.afAuth.authState.take(1).subscribe(auth => {
      this.afDatabase.object('profile/${auth.uid}').set(this.profile)
        .then(() => this.navCtrl.setRoot('TabsPage'));
    })
  }

}
