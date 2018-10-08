import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaquinaBraillePage } from './maquina-braille';

@NgModule({
  declarations: [
    MaquinaBraillePage,
  ],
  imports: [
    IonicPageModule.forChild(MaquinaBraillePage),
  ],
})
export class MaquinaBraillePageModule {}
