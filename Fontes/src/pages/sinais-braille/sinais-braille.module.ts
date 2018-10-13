import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SinaisBraillePage } from './sinais-braille';

@NgModule({
  declarations: [
    SinaisBraillePage,
  ],
  imports: [
    IonicPageModule.forChild(SinaisBraillePage),
  ], 
})
export class SinaisBraillePageModule {}
