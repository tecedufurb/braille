import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';

import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { SchedulePage } from '../pages/schedule/schedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    SchedulePage,
    SessionDetailPage,
    TabsPage,
    TutorialPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: SchedulePage, name: 'Schedule', segment: 'schedule' },
        { component: SessionDetailPage, name: 'SessionDetail', segment: 'sessionDetail/:sessionId' },
        { component: AboutPage, name: 'About', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' },
      ]
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    SchedulePage,
    SessionDetailPage,
    TabsPage,
    TutorialPage,
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen
  ]
})
export class AppModule { }
