import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { audio } from '../audio';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { Observable } from 'rxjs';
//import { Push/* PushObject, PushOptions*/ } from '@ionic-native/push';


export class audios {
  cod: number;
  nota: string;
  audio: string;
}

@IonicPage()
@Component({
  selector: 'page-mobile',
  templateUrl: 'mobile.html',
  providers: [
    audio
  ]
})
export class MobilePage {

  lista: number;

  audiosClas: Observable<any>;

  listaNotas: Array<any>;
  public itemRef: any; //fireBase.database.Reference = firebase.database().ref('/items');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public natAudio: audio,
    public fireBase: AngularFireDatabase,
    public fbAuth: AngularFireAuth) {

    //this.listaNotas = new Array<audios>();
    //this.audiosClas = this.fireBase.list("/audio").valueChanges().;

    // this.itemRef = fireBase.object("audio/").query;
    // console.log('nota:'+this.itemRef.nota );
  }

  ionViewDidLoad() {
    this.fbAuth.auth.signInAnonymously().catch(function (error) {
      console.log(error.message);
    });
  }

  selecionarLista(numList: number) {
    this.lista = numList;
    console.log(this.listaNotas[0].key);
  }

  getAll() {
    return this.fireBase.list('ultimo/', ref => ref.orderByChild('1'))
      .snapshotChanges()
      .map(Changes => {
        this.listaNotas = Changes.map(p => ({
          key: p.payload.key, ...p.payload.val()
        }));
      })
  }

}

