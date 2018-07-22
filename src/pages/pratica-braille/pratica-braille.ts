import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { palavraBraille } from '../palavrasBraille';


@IonicPage()
@Component({
  selector: 'page-pratica-braille',
  templateUrl: 'pratica-braille.html',
})
export class PraticaBraillePage {

  palavra: String;
  simbolos = [];
  imagem: string;
  elegivel = [];
  posi: number;
  pAtualC1 = '000000';
  nivel: number;
 
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    this.palavra = "";
    this.elegivel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 38, 52, 53, 54];
    this.sortearPalavra();
    this.nivel = 0;

  }

  selecionarPalavra(): number {
    return Math.floor((Math.random() * this.elegivel.length));

  }

  sortearPalavra() {
    let num = this.selecionarPalavra();
    this.elegivel.slice(num,1);
    this.posi = this.elegivel[num];
    this.palavra = palavraBraille.exemplosImagem[this.posi].palavra;
    this.imagem = palavraBraille.exemplosImagem[this.posi].imagem;
    this.montarSimbolos();
  }

  montarSimbolos(){
    let letrasEsc = [0,2]
    for (let i = 0; i < this.palavra.length; i++) {

      if (letrasEsc.indexOf(i)) {
        this.simbolos.push(palavraBraille.letrasSmall.find(obj => obj.letra === this.palavra[i].toLowerCase()).img);
      } else {
        this.simbolos.push("./assets/img/sinais-braille-small/interrogacao-p.png");
      }
    }
  }

  marcar(posicao: string) {
    if (document.getElementById(posicao).style.backgroundColor === "black") {
      document.getElementById(posicao).style.backgroundColor = "transparent";
    } else {
      document.getElementById(posicao).style.backgroundColor = "black";
    }
    if (document.getElementById('c1p1').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p2').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p3').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p4').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p5').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
    if (document.getElementById('c1p6').style.backgroundColor === "black") { this.pAtualC1 = this.pAtualC1 + '1'; } else { this.pAtualC1 = this.pAtualC1 + '0'; }
  }
  proximo() {

  }

}