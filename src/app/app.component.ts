import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { IntroPage } from '../pages/intro/intro';
import { RegisterPage } from '../pages/register/register';
import { Session } from '../app/session';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;
  constructor(public session: Session, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      this.session.get().then(res => {
        if (res != undefined && res != null) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = IntroPage;
        }
      });

    });
  }
}
