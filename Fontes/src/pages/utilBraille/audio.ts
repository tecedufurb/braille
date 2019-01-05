import { NativeAudio } from '@ionic-native/native-audio';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';

@Injectable()
export class Audio {
    frase = [
        { frase: 'aprenda', audio: 'Aprenda.mp3' },
        { frase: 'bemvindo', audio: 'Bem vindo.mp3' },
        { frase: 'construaPalavras', audio: 'construa Palavras.mp3' },
        { frase: 'consulta', audio: 'Consulta.mp3' },
        { frase: 'facaExercicios', audio: 'Faca Exercicios.mp3' },
        { frase: 'ok', audio: 'ok.mp3' },
        { frase: 'paginaInicial', audio: 'Pagina inicial.mp3' },
        { frase: 'pratica', audio: 'Prática.mp3' },
        { frase: 'pratique', audio: 'Pratique.mp3' },
        { frase: 'pular', audio: 'Pular.mp3' },
        { frase: 'sinaisbraille', audio: 'Sinais braille.mp3' },
        { frase: 'tutorial', audio: 'Tutorial.mp3' },
        { frase: 'vamoscomecar', audio: 'Vamos começar.mp3' },
        { frase: 'maquinabraille', audio: 'Maquina braille.mp3' }
    ];

    public constructor(public nativAudio: NativeAudio, public plt: Platform) {
        var i;
        if (!this.plt.is('core')  && !this.plt.is('mobileweb')) {
            console.log('plat: '+this.plt.platforms())
            for (i = 0; i < this.frase.length; i++) {
                this.nativAudio.preloadSimple(this.frase[i].frase, 'assets/audio/' + this.frase[i].audio).then(() => {
                    console.log('inserido audio: ' + this.frase[i].frase);
                }).catch(erro => {
                    console.log(erro);
                });
            }
        }
    }


    public tocar(frase: string, time: number) {
        if (!this.plt.is('core')  && !this.plt.is('mobileweb'))
            setTimeout(() => { this.nativAudio.play(frase) }, time)

    }



}