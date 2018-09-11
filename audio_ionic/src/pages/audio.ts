import { NativeAudio } from '@ionic-native/native-audio';
import { Injectable } from '@angular/core';

@Injectable()
export class audio {
    public notasMusicais = [
        { cod: 1, nota: 'DÓ', audio: 'do.wav' },
        { cod: 2, nota: 'RÉ', audio: 're.wav' },
        { cod: 3, nota: 'MI', audio: 'mi.wav' },
        { cod: 4, nota: 'FÁ', audio: 'fa.wav' },
        { cod: 5, nota: 'SOL', audio: 'sol.wav' },
        { cod: 6, nota: 'LÁ', audio: 'la.wav' },
        { cod: 7, nota: 'SI', audio: 'si.wav' },
        { cod: 8, nota: 'DÓ#', audio: 'do_s.wav' },
        { cod: 9, nota: 'RÉ#', audio: 're_s.wav' },
        { cod: 10, nota: 'MI#', audio: 'mi_s.wav' },
        { cod: 11, nota: 'FÁ#', audio: 'fa_s.wav' },
        { cod: 12, nota: 'SOL#', audio: 'sol_s.wav' },
        { cod: 13, nota: 'LÁ#', audio: 'la_s.wav' },
        { cod: 14, nota: 'SI#', audio: 'si_s.wav' }];

    public constructor(public nativAudio: NativeAudio) {
        var i;
        for (i = 0; i < this.notasMusicais.length; i++) {
            this.nativAudio.preloadComplex(this.notasMusicais[i].nota, '../../assets/audio/' + this.notasMusicais[i].audio, 1, 1, 0).then((ok) => {
                console.log('Nota: ' + this.notasMusicais[i].nota);
            }).catch(erro => {
                console.log('Erro audio : ' + erro);
            });
        }
    }


    public play(nota: string) {
        this.nativAudio.play(nota);
    }



}