import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { audio } from '../audio';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
//import { setTimeout } from 'timers';

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

  @Output() onCreate: EventEmitter<any> = new EventEmitter<any>();
  listaNotas: Observable<any[]>;
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

  ngOnInit() {      
    this.onCreate.emit('dummy'); 
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

  /*  if (this.listaNotas != null) {
      this.listaNotas.forEach(nota => {
        console.log(JSON.stringify(nota));
       // setTimeout(() => {console.log('ok:'+ok); this.natAudio.play(ok.nota)  }, 2000)
      })
    }*/
  }

  tocarnota(nota: string) {
    console.log('tocou')
    setTimeout(() => {this.natAudio.play(nota)  }, 2000)
  }



  getAll() {
    if (this.lista > 0)
      return this.db.list<Array<audios>>('toque/' + this.lista).valueChanges()
  }
}

