import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MobilePage } from '../mobile/mobile';
import { WebPage } from '../web/web';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  mobile(){
    this.navCtrl.push(MobilePage);
  }

  web(){
    this.navCtrl.push(WebPage);
  }

}
 