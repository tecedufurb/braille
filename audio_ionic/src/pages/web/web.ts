import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { audio } from '../audio'

/**
 * Generated class for the WebPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-web',
  templateUrl: 'web.html',
  providers: [
    audio
  ]
})

export class WebPage {

  listaSelecionadas = new Array<any>();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireBase: AngularFireDatabase,
    public fbAuth: AngularFireAuth,
    public toastCtrl: ToastController,
    public natAudio: audio,
  ) {
      
  }

  ionViewDidLoad() {
    this.fbAuth.auth.signInAnonymously().catch(function (error) {
      console.log(error.message);
    });
  }

  adicionarLista(item: any) {
    this.natAudio.play(item.nota);
    console.log(item.nota);
    this.listaSelecionadas.push(item);
  }

  enviarLista(num: string) {
    let toast = this.toastCtrl.create();
    toast.setDuration(3000);
    let ok: boolean
    ok = true;
  
    if (this.listaSelecionadas.length > 0) {
      this.fireBase.list('toque/').set(num, this.listaSelecionadas)
        .then(function () {
          toast.setMessage("Gravdo com sucesso!");
        })
        .catch(function (ERRO) {
          toast.setMessage("Erro ao gravar lista:" + ERRO);
          ok = false;
        });
        this.fireBase.list('ultimo/').set(num,Date.now())
        .then(function () {
          toast.setMessage("Gravdo com sucesso!");
        })
        .catch(function (ERRO) {
          toast.setMessage("Erro ao gravar lista:" + ERRO);
          ok = false;
        });
    } else {
      toast.setMessage("A lista esta vazia");
    }
    toast.present();
    if (ok)
      this.listaSelecionadas.length = 0;
  }

  removerDaLista(item: number){ 
    this.listaSelecionadas.splice(item,1);
  }


}
