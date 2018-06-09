import { Component } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { NavController, MenuController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { UserOptions } from '../../interfaces/user-options';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { SchedulePage } from '../schedule/schedule';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  login: UserOptions = { username: '', password: '' };
  

  constructor(
    public navCtrl: NavController, 
    public userData: UserData,
    private menuCtrl: MenuController,
  ) { 

  }

  //Habilita e desabilita menu lateral, deixar comentado para não rpecisar criar usuario sempre
  ionViewWillEnter(): void  {
    this.menuCtrl.enable(false, 'loggedOutMenu');
  }

  ionViewWillLeave(): void {
    this.menuCtrl.enable(true, 'loggedOutMenu');
  }

  onLogin() {
    //this.submitted = true;

   // if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(SchedulePage); 
   // }
  }

  criarContaUsuario() {
   this.navCtrl.push(CriarContaPage); 
  }
}
