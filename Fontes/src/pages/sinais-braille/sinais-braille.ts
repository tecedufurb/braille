import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ExemploBraillePage } from '../exemplo-braille/exemplo-braille';
import { Audio } from '../utilBraille/audio';

@IonicPage()
@Component({
  selector: 'page-sinais-braille',
  templateUrl: 'sinais-braille.html',
  providers: [
    Audio
  ]
})
export class SinaisBraillePage {

  simbolo: {
    sinal: string,
    imagem: String;
  }
  serieDeSinais = 0;
  series = [this.simbolo];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public audio: Audio
  ) {

    this.serie(1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SinaisBraillePage');
    this.audio.tocar("sinaisbraille", 100)

  }


  showExemplo(simbolo: string) {
    this.navCtrl.push(ExemploBraillePage, { letra: simbolo });
  }

  serie(serieAtual: number) {
    if (serieAtual == 1) {
      this.series = [
        { sinal: 'a', imagem: './assets/img/sinais-braille/a-braille.png' },
        { sinal: 'b', imagem: './assets/img/sinais-braille/b-braille.png' },
        { sinal: 'c', imagem: './assets/img/sinais-braille/c-braille.png' },
        { sinal: 'd', imagem: './assets/img/sinais-braille/d-braille.png' },
        { sinal: 'e', imagem: './assets/img/sinais-braille/e-braille.png' },
        { sinal: 'f', imagem: './assets/img/sinais-braille/f-braille.png' },
        { sinal: 'g', imagem: './assets/img/sinais-braille/g-braille.png' },
        { sinal: 'h', imagem: './assets/img/sinais-braille/h-braille.png' },
        { sinal: 'i', imagem: './assets/img/sinais-braille/i-braille.png' },
        { sinal: 'j', imagem: './assets/img/sinais-braille/j-braille.png' },
      ];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 2) {
      this.series = [
        { sinal: 'k', imagem: './assets/img/sinais-braille/k-braille.png' },
        { sinal: 'l', imagem: './assets/img/sinais-braille/l-braille.png' },
        { sinal: 'm', imagem: './assets/img/sinais-braille/m-braille.png' },
        { sinal: 'n', imagem: './assets/img/sinais-braille/n-braille.png' },
        { sinal: 'o', imagem: './assets/img/sinais-braille/o-braille.png' },
        { sinal: 'p', imagem: './assets/img/sinais-braille/p-braille.png' },
        { sinal: 'q', imagem: './assets/img/sinais-braille/q-braille.png' },
        { sinal: 'r', imagem: './assets/img/sinais-braille/r-braille.png' },
        { sinal: 's', imagem: './assets/img/sinais-braille/s-braille.png' },
        { sinal: 't', imagem: './assets/img/sinais-braille/t-braille.png' }];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 3) {
      this.series = [
        { sinal: 'u', imagem: './assets/img/sinais-braille/u-braille.png' },
        { sinal: 'v', imagem: './assets/img/sinais-braille/v-braille.png' },
        { sinal: 'x', imagem: './assets/img/sinais-braille/x-braille.png' },
        { sinal: 'y', imagem: './assets/img/sinais-braille/y-braille.png' },
        { sinal: 'z', imagem: './assets/img/sinais-braille/z-braille.png' },
        { sinal: 'ç', imagem: './assets/img/sinais-braille/cedilha-braille.png' },
        { sinal: 'é', imagem: './assets/img/sinais-braille/e-agudo-braille.png' },
        { sinal: 'á', imagem: './assets/img/sinais-braille/a-agudo-braille.png' },
        { sinal: 'è', imagem: './assets/img/sinais-braille/e-crase-braille.png' },
        { sinal: 'ú', imagem: './assets/img/sinais-braille/u-agudo-braille.png' }];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 4) {
      this.series = [
        { sinal: 'â', imagem: './assets/img/sinais-braille/a-circunflexo-braille.png' },
        { sinal: 'ê', imagem: './assets/img/sinais-braille/e-circunflexo-braille.png' },
        { sinal: ' ', imagem: './assets/img/sinais-braille/SE146-braille.png' },
        { sinal: 'ô', imagem: './assets/img/sinais-braille/o-circunflexo-braille.png' },
        { sinal: '@', imagem: './assets/img/sinais-braille/arroba-braille.png' },
        { sinal: 'à', imagem: './assets/img/sinais-braille/a-crase-braille.png' },
        { sinal: 'ï', imagem: './assets/img/sinais-braille/i-trema-braille.png' },
        { sinal: 'ü', imagem: './assets/img/sinais-braille/u-trema-braille.png' },
        { sinal: 'õ', imagem: './assets/img/sinais-braille/o-til-braille.png' },
        { sinal: 'w', imagem: './assets/img/sinais-braille/w-braille.png' }];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 5) {
      this.series = [
        { sinal: ',', imagem: './assets/img/sinais-braille/virgula-braille.png' },
        { sinal: ';', imagem: './assets/img/sinais-braille/ponto-e-virgula-braille.png' },
        { sinal: ':', imagem: './assets/img/sinais-braille/dois-pontos-braille.png' },
        { sinal: '÷', imagem: './assets/img/sinais-braille/divisao-braille.png' },
        { sinal: '?', imagem: './assets/img/sinais-braille/interrogacao-braille.png' },
        { sinal: '!', imagem: './assets/img/sinais-braille/exclamacao-braille.png' },
        { sinal: '+', imagem: './assets/img/sinais-braille/adicao-braille.png' },
        { sinal: '=', imagem: './assets/img/sinais-braille/igual-braille.png' },
        { sinal: '×', imagem: './assets/img/sinais-braille/multiplicacao-braille.png' },
        { sinal: '"', imagem: './assets/img/sinais-braille/aspas-braille.png' },
        { sinal: '*', imagem: './assets/img/sinais-braille/asterisco-braille.png' },
        { sinal: 'º', imagem: './assets/img/sinais-braille/grau-braille.png' }];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 6) {
      this.series = [
        { sinal: 'í', imagem: './assets/img/sinais-braille/i-agudo-braille.png' },
        { sinal: 'ã', imagem: './assets/img/sinais-braille/a-til-braille.png' },
        { sinal: 'ó', imagem: './assets/img/sinais-braille/o-agudo-braille.png' },
        { sinal: 'nº', imagem: './assets/img/sinais-braille/sinal-numerico-braille.png' },
        { sinal: '.', imagem: './assets/img/sinais-braille/ponto-final-braille.png' },
        { sinal: '-', imagem: './assets/img/sinais-braille/hifen-braille.png' }];
      this.serieDeSinais = serieAtual;
    } else if (serieAtual == 7) {
      this.series = [
        { sinal: 'SE4', imagem: './assets/img/sinais-braille/SE4-braille.png' },
        { sinal: 'SE45', imagem: './assets/img/sinais-braille/SE45-braille.png' },
        { sinal: 'SE456', imagem: './assets/img/sinais-braille/SE456-braille.png' },
        { sinal: 'SE5', imagem: './assets/img/sinais-braille/SE5-braille.png' },
        { sinal: 'maiúscula', imagem: './assets/img/sinais-braille/sinal-maiusculo-braille.png' },
        { sinal: '$', imagem: './assets/img/sinais-braille/cifrao-braille.png' },
        { sinal: 'SE6', imagem: './assets/img/sinais-braille/SE6-braille.png' }];
      this.serieDeSinais = 7;
    }

  }

}
