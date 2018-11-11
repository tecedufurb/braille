import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { palavraBraille } from '../palavrasBraille';
import { Audio } from '../utilBraille/audio';


@IonicPage()
@Component({
  selector: 'page-consulta-braille',
  templateUrl: 'consulta-braille.html',
  providers: [
    Audio
  ]
})
export class ConsultaBraillePage {

  texto: string;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private audio: Audio) {

  }

  ionViewDidLoad() {
    this.audio.tocar("consulta",100)
  }

  marcar(posicao: string) {

    if (document.getElementById(posicao).style.backgroundColor === "black") {
      document.getElementById(posicao).style.backgroundColor = "transparent";
    } else {
      document.getElementById(posicao).style.backgroundColor = "black";
    }

    var pAtualC1 = '';

    if (document.getElementById('c1p1').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }
    if (document.getElementById('c1p2').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }
    if (document.getElementById('c1p3').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }
    if (document.getElementById('c1p4').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }
    if (document.getElementById('c1p5').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }
    if (document.getElementById('c1p6').style.backgroundColor === "black") { pAtualC1 = pAtualC1 + '1'; } else { pAtualC1 = pAtualC1 + '0'; }

    var pAtualC2 = '';

    if (document.getElementById('c2p1').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }
    if (document.getElementById('c2p2').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }
    if (document.getElementById('c2p3').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }
    if (document.getElementById('c2p4').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }
    if (document.getElementById('c2p5').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }
    if (document.getElementById('c2p6').style.backgroundColor === "black") { pAtualC2 = pAtualC2 + '1'; } else { pAtualC2 = pAtualC2 + '0'; }



    // Identificando pontos braille.    
    if ((pAtualC1 === '000000') && (pAtualC2 === '000000')) {
      this.texto = 'Espaço';
    } else if (palavraBraille.brailleComposto.indexOf(pAtualC1) >= 0) {
      if ((palavraBraille.brailleSimples.indexOf(pAtualC2) < 0) && (pAtualC2 === '000000')) {
        this.texto = palavraBraille.correspontenteC[palavraBraille.brailleComposto.indexOf(pAtualC1)];
      } else if (palavraBraille.brailleSimples.indexOf(pAtualC2) >= 0) {

        // Tratamento dos sinais compostos.
        if (pAtualC1 === '000101') { // Letra maíuscula
          this.texto = palavraBraille.correspondenteS[palavraBraille.brailleSimples.indexOf(pAtualC2)].toUpperCase();
        } else if (pAtualC1 === '001111') { // Número
          if (palavraBraille.brailleNumero.indexOf(pAtualC2) >= 0) {
            this.texto = palavraBraille.correspondenteN[palavraBraille.brailleNumero.indexOf(pAtualC2)];
          } else {
            this.texto = 'Sinal sem correspondência';
          }
        } else {
          this.texto = 'Sinal composto sem tratamento';
        }

      } else {
        this.texto = 'Sinal sem correspondência';
      }
    } else if (palavraBraille.brailleComposto.indexOf(pAtualC1 + pAtualC2) >= 0) {
      this.texto = palavraBraille.correspontenteC[palavraBraille.brailleComposto.indexOf(pAtualC1 + pAtualC2)];
    } else if (((palavraBraille.brailleSimples.indexOf(pAtualC1) >= 0) && (palavraBraille.brailleSimples.indexOf(pAtualC2) < 0) && (pAtualC2 === '000000')) ||
      ((palavraBraille.brailleSimples.indexOf(pAtualC2) >= 0) && (palavraBraille.brailleSimples.indexOf(pAtualC1) < 0) && (pAtualC1 === '000000'))) {
      if (palavraBraille.brailleSimples.indexOf(pAtualC1) >= 0) {
        this.texto = palavraBraille.correspondenteS[palavraBraille.brailleSimples.indexOf(pAtualC1)];
      } else {
        this.texto = palavraBraille.correspondenteS[palavraBraille.brailleSimples.indexOf(pAtualC2)];
      }
    } else {
      this.texto = 'Sinal sem correspondência';
    }
  }
}