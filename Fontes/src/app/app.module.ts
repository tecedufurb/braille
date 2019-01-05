import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SplashScreen } from '@ionic-native/splash-screen';

import { IonicStorageModule } from '@ionic/storage';
//import { AngularFireModule } from 'angularfire2';
//import { AngularFireDatabaseModule} from 'angularfire2/database';
//import { AngularFireAuthModule} from 'angularfire2/auth';
//import { AutenticacaoProvider } from '../providers/autenticacao/autenticacao';
import { NativeAudio } from '@ionic-native/native-audio';

import { ConferenceApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { TabsPage } from '../pages/tabs-page/tabs-page';
import { TutorialPage } from '../pages/tutorial/tutorial';
import { ConferenceData } from '../providers/conference-data';
import { UserData } from '../providers/user-data';
import { LoginPageModule } from '../pages/login/login.module';
import { CriarContaPageModule } from '../pages/criar-conta/criar-conta.module';
import { SinaisBraillePageModule } from '../pages/sinais-braille/sinais-braille.module';
import { ExemploBraillePageModule } from '../pages/exemplo-braille/exemplo-braille.module';
import { ConsultaBraillePageModule } from '../pages/consulta-braille/consulta-braille.module';
import { PraticaBraillePageModule } from '../pages/pratica-braille/pratica-braille.module';
import { LoginPage } from '../pages/login/login';
import { PrincipalPage } from '../pages/Principal/Principal';
import { MaquinaBraillePageModule } from '../pages/maquina-braille/maquina-braille.module';
import { InformacoesPageModule } from '../pages/informacoes/informacoes.module';
import { IonicAudioModule, defaultAudioProviderFactory } from 'ionic-audio';


//const autenticacaoFirebase = { 
  ///Usar configuração do google firebase
  ///
//};


@NgModule({
  declarations: [
    ConferenceApp,
    AboutPage,
    PrincipalPage,
    TabsPage,
    TutorialPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(ConferenceApp, {}, {
      links: [
        { component: TabsPage, name: 'TabsPage', segment: 'tabs-page' },
        { component: PrincipalPage, name: 'Principal', segment: 'principal' },
        { component: LoginPage, name: 'Login', segment: 'LoginPage' },
        { component: AboutPage, name: 'AboutPage', segment: 'about' },
        { component: TutorialPage, name: 'Tutorial', segment: 'tutorial' }
      ]
    }),
    IonicStorageModule.forRoot(),
    //AngularFireDatabaseModule,
    //AngularFireModule.initializeApp(autenticacaoFirebase),
    //AngularFireAuthModule,
    LoginPageModule,
    CriarContaPageModule,
    SinaisBraillePageModule,
    ExemploBraillePageModule,
    ConsultaBraillePageModule,
    PraticaBraillePageModule,
    MaquinaBraillePageModule,
    InformacoesPageModule,
    IonicAudioModule.forRoot(defaultAudioProviderFactory)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    ConferenceApp,
    AboutPage,
    PrincipalPage,
    TabsPage,
    TutorialPage
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ConferenceData,
    UserData,
    InAppBrowser,
    SplashScreen,
    //AutenticacaoProvider,
    NativeAudio
  ]
})
export class AppModule {
}
