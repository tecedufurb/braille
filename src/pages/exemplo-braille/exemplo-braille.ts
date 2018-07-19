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
  texto: String;
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
    this.texto = palavraBraille.exemplosImagem[posicao].texto;
  }

  simbolosBraille() {
    var i;
    var qtdMai = 0;
    for (i = 0; i < this.palavra.length; i++) {
      //Se for numero então jogar o simbolo de numero antes...
      if (!isNaN(Number(this.palavra[i])) && (this.palavra[i] != ' ')) {
        if (i == 0) {
          ///Se a letra for nº então mostrar destacada
          if (this.letra == 'nº')
            this.simbolos.push('./assets/img/sinais-braille-small/shift-n-d.png');
          else
            this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
        } else {
          if (this.palavra[i - 1] == ' ') {
            ///Se a letra for nº então mostrar destacada
            if (this.letra == 'nº')
              this.simbolos.push('./assets/img/sinais-braille-small/shift-n-d.png');
            else
              this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
          }
        }
      }
      if (this.letra == 'SE4') {
        this.letra = 'Simbolo especial';
        this.simbolos.push('./assets/img/sinais-braille-small/SE4.png');
        this.simbolos.push('./assets/img/sinais-braille-small/p.png');
      }
      if (this.letra == 'SE45') {
        this.letra = 'Simbolo especial';
        this.simbolos.push('./assets/img/sinais-braille-small/SE45-d.png');
        this.simbolos.push('./assets/img/sinais-braille-small/a.png');
      }
      if (this.letra == 'SE5') {
        this.letra = 'Simbolo especial';
        this.simbolos.push('./assets/img/sinais-braille-small/SE5-d.png');
      }
      if (this.letra == 'SE6') {
        this.letra = 'Simbolo especial';
      }
      if (this.letra == 'SE456') {
        this.letra = 'Simbolo especial';
        this.simbolos.push('./assets/img/sinais-braille-small/shift-n.png');
        this.simbolos.push('./assets/img/sinais-braille-small/e.png');
        this.simbolos.push('./assets/img/sinais-braille-small/SE456-d.png');
        this.simbolos.push('./assets/img/sinais-braille-small/grau.png');
      }
      // if (this.imagem != ' ') {  
      if (this.isMaiuscula(this.palavra[i]) && qtdMai < 2) {
        if (this.letra == 'maiúscula') 
          this.simbolos.splice(0, 0, './assets/img/sinais-braille-small/shift-d.png')
        else
          this.simbolos.splice(0, 0, './assets/img/sinais-braille-small/shift.png')
        qtdMai++;
      }
      if (this.letra.toLowerCase() == this.palavra[i].toLowerCase()) {
        console.log(this.palavra[i].toLowerCase());
        this.simbolos.push(palavraBraille.letrasSmall.find(obj => obj.letra === this.palavra[i].toLowerCase()).imgMarcado);
      } else {
        this.simbolos.push(palavraBraille.letrasSmall.find(obj => obj.letra === this.palavra[i].toLowerCase()).img);
        //   }
      }
    }
  }



  isMaiuscula(letra: String): boolean {
    return (letra.charCodeAt(0) >= 65 && letra.charCodeAt(0) <= 90)
  }

  apenasMaiuscula(palavra: String): boolean {
    let retorno = true;
    var i;
    for (i = 0; i < this.palavra.length; i++) {
      if (palavra.charCodeAt(i) >= 65 && palavra.charCodeAt(i) <= 90) {
        return false;
      }
    }
    return retorno;
  }






}
