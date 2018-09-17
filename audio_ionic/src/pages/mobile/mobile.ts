import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { audio } from '../audio';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

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


  listaNotas: Observable<Array<audios>[]>;
  tocar = new Array<any>();
  lista: Number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: AngularFireDatabase,
    public toastCtrl: ToastController,
    public fbAuth: AngularFireAuth,
    public natAudio: audio) {

    this.lista = 0;

  }

  ionViewDidLoad() {
    this.fbAuth.auth.signInAnonymously().then(() => {
      console.log('logado com sucesso...');
    }).catch((err) => {
      console.log(err.message);
    });
  }

  selecionarLista(numList: number) {
    this.lista = numList;
    this.listaNotas = this.getAll();

    if (this.listaNotas != null)
      
    this.listaNotas.forEach(nota => {
      let ok = JSON.parse(JSON.stringify(nota[1]));
      this.natAudio.play(ok.nota);
    })

  }

  tocarnota() {
    this.listaNotas.subscribe(notas => {
      notas.forEach(toque => {
        console.log('diva' + toque)
      })
    })
  }

  

  getAll() {
    if (this.lista > 0)
      return this.db.list<Array<audios>>('toque/' + this.lista).valueChanges()
  }
}

