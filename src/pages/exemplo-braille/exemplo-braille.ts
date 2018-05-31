import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { palavraBraille } from '../palavrasBraille';

@IonicPage()
@Component({
  selector: 'page-exemplo-braille',
  templateUrl: 'exemplo-braille.html',
})
export class ExemploBraillePage {

  imagem: String;
  palavra: String;
  letra: string;
  simbolos = new Array();

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.letra = navParams.get('letra');

    this.mostrarExemplo(palavraBraille.letrasSmall.findIndex(obj => obj.letra === this.letra));
    this.simbolosBraille();
    ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExemploBraillePage');
  }

  mostrarExemplo(posicao: number) {
    this.palavra = palavraBraille.exemplosImagem[posicao].palavra;
    this.imagem = palavraBraille.exemplosImagem[posicao].imagem;
  }

  simbolosBraille() {
    var i;
    for (i = 0; i < this.palavra.length; i++) {
      if (this.imagem != ' '){
        if (this.letra == this.palavra[i]) {
          this.simbolos.push(palavraBraille.letrasSmall.find(obj => obj.letra === this.palavra[i]).imgMarcado);
        } else {
          this.simbolos.push(palavraBraille.letrasSmall.find(obj => obj.letra === this.palavra[i]).img);
        }
      }
    }


  }





}
