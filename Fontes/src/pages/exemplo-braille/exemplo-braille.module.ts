import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExemploBraillePage } from './exemplo-braille';

@NgModule({
  declarations: [
    ExemploBraillePage,
  ],
  imports: [
    IonicPageModule.forChild(ExemploBraillePage),
  ],
})
export class ExemploBraillePageModule {}
