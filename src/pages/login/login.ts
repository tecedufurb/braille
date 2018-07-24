import { Component } from '@angular/core';
//import { NgForm } from '@angular/forms';
import { NavController, MenuController, ToastController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { SchedulePage } from '../schedule/schedule';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { usuario } from '../../providers/autenticacao/usuario';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {
  usuario: usuario;
  form: FormGroup;


  constructor(
    public navCtrl: NavController,
    public userData: UserData,
    private menuCtrl: MenuController,
    private formBuilder: FormBuilder,
    private authService: AutenticacaoProvider,
    private toastCtrl: ToastController
  ) {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]]

    });

  }

  //Habilita e desabilita menu lateral, deixar comentado para não rpecisar criar usuario sempre
  ionViewWillEnter(): void {
    this.menuCtrl.enable(false, 'loggedOutMenu');
  }

  ionViewWillLeave(): void {
    this.menuCtrl.enable(true, 'loggedOutMenu');
  }

  onLogin() {
    if (this.form.valid) {
      let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });
      this.usuario = this.form.value;
      this.authService.logar(this.usuario).then(() => {
        this.userData.login(this.usuario.email);
        this.navCtrl.setRoot(SchedulePage);
      }).catch((error: any) => {

        if (error.code ==  "auth/invalid-email"){
          toast.setMessage("Email inválido");
        }else if (error.code == "auth/user-disabled"){
          toast.setMessage("Usuário desativado");
        }else if (error.code == "auth/user-not-found"){
          toast.setMessage("Email não cadastrado");
        }else if (error.code == "auth/wrong-password"){
          toast.setMessage("Senha inválida");
        }else{
          toast.setMessage("Erro ao fazer login");
        }
        toast.present();

      });
    }

  }
  criarContaUsuario() {
    this.navCtrl.push(CriarContaPage);
  }
}
