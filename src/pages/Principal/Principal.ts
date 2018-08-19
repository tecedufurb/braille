import { Component, ViewChild } from '@angular/core';
import { AlertController, App, List, ModalController, NavController, ToastController, LoadingController,  MenuController } from 'ionic-angular';
import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';
import { SinaisBraillePage } from '../sinais-braille/sinais-braille';
import { ConsultaBraillePage } from '../consulta-braille/consulta-braille';
import { PraticaBraillePage } from '../pratica-braille/pratica-braille';

@Component({
  selector: 'page-schedule',
  templateUrl: 'Principal.html'
}) 
export class PrincipalPage {
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public user: UserData,
    public menu: MenuController,
  ) {

    
  }

  ionViewDidLoad() {
    this.app.setTitle('Principal');
    this.menu.enable(true, 'loggedOutMenu');
  }

  paginaSinais(){
    this.navCtrl.push(SinaisBraillePage);
  }

  paginaConsulta(){
    this.navCtrl.push(ConsultaBraillePage);
  }

  paginaPratica(){
    this.navCtrl.push(PraticaBraillePage);
  }
}
