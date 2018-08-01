import { ToastController, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class Utils {



    constructor(
        public toastCtrl: ToastController,
        public loadingCtrl: LoadingController) {

    }

    public showMensagem(message, pos, classCss) {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: pos,
            cssClass: classCss,
        });
        toast.present();
    }

    LoadingMensagem(imagem: string = '', texto: string = 'Loading', tempo: number = 3000) {
        let loading = this.loadingCtrl.create({
            spinner: 'hide',
            content: `
            <div class="custom-spinner-container">
              <img border="0" src="`+ imagem + `"> 
              `+ texto + `
            </div>`,
            duration: tempo
        });
        loading.present();
    }
}