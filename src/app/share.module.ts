import { NgModule }       from '@angular/core';

import { ProfilePage } from '../pages/profile/profile';
import { FeedPage } from '../pages/feed/feed';
import { TabsPage } from '../pages/tabs/tabs';
import { IntroPage } from '../pages/intro/intro';
import { LoginPage } from '../pages/login/login';
import { EventoPage } from '../pages/evento/evento';
import { RegisterPage } from '../pages/register/register';
import { HomePage } from '../pages/home/home';

@NgModule({
    imports: [
    ],
    declarations: [
      ProfilePage,
      FeedPage,
      TabsPage,
      IntroPage,
      LoginPage,
      EventoPage,
      RegisterPage,
      HomePage,   
    ],
    providers: [
    ],
    exports: [
        ProfilePage,
        FeedPage,
        TabsPage,
        IntroPage,
        LoginPage,
        EventoPage,
        RegisterPage,
        HomePage,
    ]
})
export class SharedModule {}