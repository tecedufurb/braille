import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';

import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { SchedulePage } from '../pages/schedule/schedule';
import { SessionDetailPage } from '../pages/session-detail/session-detail';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { LoginPageModule } from '../pages/login/login.module';
import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { CriarContaPageModule } from '../pages/criar-conta/criar-conta.module';
import { SinaisBraillePageModule } from '../pages/sinais-braille/sinais-braille.module';
import { ExemploBraillePageModule } from '../pages/exemplo-braille/exemplo-braille.module';
import { ConsultaBraillePageModule } from '../pages/consulta-braille/consulta-braille.module';

const autenticacaoFirebase = {
  apiKey: "AIzaSyC_ZnM2X7xmXzONJMlpJhVaWg3mxFDGPs4",
  authDomain: "tagarela-braille.firebaseapp.com",
  databaseURL: "https://tagarela-braille.firebaseio.com",
  projectId: "tagarela-braille",
  storageBucket: "tagarela-braille.appspot.com",
  messagingSenderId: "1019835797721"
};


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    SchedulePage,
    SessionDetailPage,
    TabsPage,
    TutorialPage
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
    IonicStorageModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(autenticacaoFirebase),
    AngularFireAuthModule,
    LoginPageModule,
    CriarContaPageModule,
    SinaisBraillePageModule,
    ExemploBraillePageModule,
    ConsultaBraillePageModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    SchedulePage,
    SessionDetailPage,
    TabsPage,
    TutorialPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    AutenticacaoProvider
  ]
})
export class AppModule { }
