import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { Utils } from '../utilBraille/utilBraille';
import { PrincipalPage } from '../Principal/Principal';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = PrincipalPage;
  tab2Root: any = AboutPage;
  mySelectedIndex: number;

  Util : Utils;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }


  mostrarInformacoes(){
    this.Util.LoadingMensagem('','Aplicativo desenvolvido pelo grupo TecEDU da Universidade Regional de Blumenau (FURB).',1000)
  }
 

}
