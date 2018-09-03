import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { palavraBraille } from '../palavrasBraille';
import { Utils } from '../utilBraille/utilBraille';


@IonicPage()
@Component({
  selector: 'page-pratica-braille',
  templateUrl: 'pratica-braille.html',
  providers: [
    Utils
  ]
})
export class PraticaBraillePage {

  palavra: String;
  simbolos = [];
  imagem: string;
  elegivel = [];
  letrasEsc = [];
  posi: number;
  pAtualC1 = '000000';
  nivel: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastCtrl: ToastController,
    public util: Utils) {

  }

  ionViewDidLoad() {
    this.palavra = "";
    this.elegivel = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 30, 31, 33, 38, 52, 53, 54];
    this.nivel = 1;
    this.sortearPalavra();
  }

  selecionarPalavra(): number {
    return Math.floor(Math.random() * this.elegivel.length);
  }

  sortearPalavra() {
    let num = this.selecionarPalavra();
    this.posi = this.elegivel[num];
    console.log(this.elegivel.splice(num, 1)); 
    console.log(this.elegivel);
    console.log(num)
    this.palavra = palavraBraille.exemplosImagem[this.posi].palavra;
    this.imagem = palavraBraille.exemplosImagem[this.posi].imagem;
    this.letrasEsc = this.sortearletrasEsconder();
    this.montarSimbolos();
  }

  sortearletrasEsconder(): Array<string> {
    let sorteados = new Array<string>();
    let arrayLetras = [];
    for (let j = 0; j < this.palavra.length; j++) {
      if (arrayLetras.indexOf(this.palavra[j]) == -1)
        arrayLetras.push(this.palavra[j]);
    }
    for (let i = 0; i < this.nivel; i++) {
      let numSort = Math.floor(Math.random() * arrayLetras.length);
      if (sorteados.indexOf(arrayLetras[numSort]) == -1)
        sorteados.push(arrayLetras[numSort])
      else if (sorteados.length == arrayLetras.length)
        return sorteados;
      else
        i--;
    }
    return sorteados;
  }

  montarSimbolos() {
    this.simbolos.length = 0;
    for (let i = 0; i < this.palavra.length; i++) {
      if (this.letrasEsc.indexOf(this.palavra[i]) == -1) {
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
    this.pAtualC1 = "";
  }

  validar() {
    let posicaoLetra = this.letrasEsc.indexOf(palavraBraille.correspondenteS[(palavraBraille.brailleSimples.indexOf(this.pAtualC1))]);
    if (posicaoLetra >= 0) {
      this.letrasEsc.splice(posicaoLetra, 1);
      ////Só a ideia não sei se vai ficar assim!
      if (this.letrasEsc.length == 1) {
        this.util.LoadingMensagem('http://gifimage.net/wp-content/uploads/2018/04/positivo-gif.gif', '', 1000);
      } else if (this.letrasEsc.length == 2) {
        this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617114822.gif', '', 1000);
      } else if (this.letrasEsc.length == 3) {
        this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617114745.gif', '', 1000);
      } else {
        this.util.LoadingMensagem('https://img.ibxk.com.br/2013/8/materias/1501820617115234.gif', '', 1000);
      }
      this.montarSimbolos();
    } else {
      this.util.LoadingMensagem('https://media.tenor.com/images/0c73a1e663523b22f1b90a46c2eb514a/tenor.gif', 'Sinbolo errado tente novamente', 1000);
    }

    if (this.letrasEsc.length == 0) {
      if (this.nivel == 10) {
        this.nivel = 1;
      } else {
        this.nivel++;
      }

      this.sortearPalavra();
    }

    this.limpaMarcacao();

  }

  pular() {
    this.sortearPalavra();
    this.limpaMarcacao();
  }



}
