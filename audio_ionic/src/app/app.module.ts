import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MobilePageModule } from '../pages/mobile/mobile.module';
import { WebPageModule } from '../pages/web/web.module';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule} from 'angularfire2/auth';
import { NativeAudio } from '@ionic-native/native-audio';
import { Push } from '@ionic-native/push';


export const config = {
  apiKey: "AIzaSyC_ZnM2X7xmXzONJMlpJhVaWg3mxFDGPs4",
  authDomain: "tagarela-braille.firebaseapp.com",
  databaseURL: "https://tagarela-braille.firebaseio.com",
  projectId: "tagarela-braille",
  storageBucket: "tagarela-braille.appspot.com",
  messagingSenderId: "1019835797721"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(config),
    MobilePageModule,
    WebPageModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    Push,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
    export class AppModule {}
