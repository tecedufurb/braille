import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConsultaBraillePage } from './consulta-braille';

@NgModule({
  declarations: [
    ConsultaBraillePage,
  ],
  imports: [
    IonicPageModule.forChild(ConsultaBraillePage),
  ],
})
export class ConsultaBraillePageModule {}
