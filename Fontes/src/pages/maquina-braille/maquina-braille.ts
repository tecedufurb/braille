import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { palavraBraille } from '../palavrasBraille';

@IonicPage()
@Component({
  selector: 'page-maquina-braille',
  templateUrl: 'maquina-braille.html',
})
export class MaquinaBraillePage {

  palavra = new Array<String>();
  sinais = new Array<String>();
  
  pAtualC1 = '000000';
  pAtualC2 = '000000';
  maiuscula: boolean;
  palavraMaiuscula: boolean;
  numero: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.numero = false;
  }

  ionViewDidLoad() {
        
    console.log('ionViewDidLoad MaquinaBraillePage');
  }


  marcar(posicao: string) {
    if (document.getElementById(posicao).style.backgroundColor === "black") {
      document.getElementById(posicao).style.backgroundColor = "transparent";
    } else {
      document.getElementById(posicao).style.backgroundColor = "black";
    }

    this.pAtualC1 = "";
    if (document.getElementById('c1p1').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p2').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p3').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p4').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p5').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p6').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
  }

  limpaMarcacao() {
    document.getElementById('c1p1').style.backgroundColor = "transparent";
    document.getElementById('c1p2').style.backgroundColor = "transparent";
    document.getElementById('c1p3').style.backgroundColor = "transparent";
    document.getElementById('c1p4').style.backgroundColor = "transparent";
    document.getElementById('c1p5').style.backgroundColor = "transparent";
    document.getElementById('c1p6').style.backgroundColor = "transparent";
    this.pAtualC1 = "000000";
  }

  inserirLetra() {
    console.log(this.pAtualC1);
    if (this.pAtualC1 === '000000') {//Espaço
      this.numero = false;
      this.maiuscula = false;
      this.palavraMaiuscula = false;
      this.palavra.push(" ");
      this.inserirSimbolo(" ");
    } else if (this.pAtualC1 == "001111") {///Número
      this.numero = true;
      this.maiuscula = false;
      this.inserirSimbolo("nº");
      this.palavra.push("");
    } else if (this.pAtualC1 === '000101') {//Maiuscula
      this.numero = false;
      if (this.maiuscula) {
        this.palavraMaiuscula = true;
      } else {
        this.maiuscula = true;
      }
      this.palavra.push("");
      this.inserirSimbolo("maiúscula");
    } else if (palavraBraille.brailleSimples.indexOf(this.pAtualC1) >= 0) {
      if (this.numero) {
        if (palavraBraille.brailleNumero.indexOf(this.pAtualC1) >= 0) {
          this.palavra.push(palavraBraille.correspondenteN[palavraBraille.brailleNumero.indexOf(this.pAtualC1)]);
          this.inserirSimbolo(palavraBraille.correspondenteN[palavraBraille.brailleNumero.indexOf(this.pAtualC1)]);
          this.maiuscula = false;
          this.palavraMaiuscula = false;
        } else {////Se não achar o número digita a letra correspondente
          let l = palavraBraille.correspondenteSinais[palavraBraille.brailleSimples.indexOf(this.pAtualC1)];
          this.palavra.push(l);
          this.inserirSimbolo(l);
        }

      } else if (this.maiuscula || this.palavraMaiuscula) {
        let l = palavraBraille.correspondenteSinais[palavraBraille.brailleSimples.indexOf(this.pAtualC1)];
        this.palavra.push(l.toUpperCase());
        this.inserirSimbolo(l);
        this.maiuscula = false;
      } else {
        let l = palavraBraille.correspondenteSinais[palavraBraille.brailleSimples.indexOf(this.pAtualC1)];
        this.palavra.push(l);
        this.inserirSimbolo(l);
      }
    }
    this.limpaMarcacao();
  }

  inserirSimbolo(letra: String) {
    this.sinais.push(palavraBraille.letrasSmall[palavraBraille.letrasSmall.findIndex(obj => obj.letra === letra)].img);
  }

  delete() {
    this.sinais.pop();
    this.palavra.pop();
    this.limpaMarcacao();
  }
}
