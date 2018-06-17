import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Geolocation } from '@ionic-native/geolocation';

import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { EventoPage } from '../pages/evento/evento';
import { RegisterPage } from '../pages/register/register';
// import { HomePage } from '../pages/home/home';

// import {SharedModule } from '../app/share.module';
import { Session } from '../app/session';
import { IonicStorageModule } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { Facebook } from '@ionic-native/facebook';//Importado
import { AngularFireAuthModule } from "angularfire2/auth";

@NgModule({
  declarations: [
    MyApp,
    
    ProfilePage,
    FeedPage,
    TabsPage,
    IntroPage,
    EventoPage,
    LoginPage,
    RegisterPage
    //HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    Session
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    FeedPage,
    TabsPage,
    EventoPage,
    IntroPage,
    LoginPage,
    RegisterPage
    // HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Facebook,
    
  ]
})
export class AppModule {}
