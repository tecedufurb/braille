import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { usuario } from '../../providers/autenticacao/usuario';
import { Utils } from '../utilBraille/utilBraille';
import { TabsPage } from '../tabs-page/tabs-page';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  providers: [
    Utils
  ]
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
    public util: Utils
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
      this.usuario = this.form.value;
      this.authService.logar(this.usuario).then(() => {
        this.userData.login(this.usuario.email);
        this.util.showMensagem('Login realizado com sucesso...',"button")
        this.navCtrl.setRoot(TabsPage);
      }).catch((error: any) => {

        if (error.code ==  "auth/invalid-email"){
          this.util.showMensagem("Email inválido")
        }else if (error.code == "auth/user-disabled"){
          this.util.showMensagem("Usuário desativado");
        }else if (error.code == "auth/user-not-found"){
          this.util.showMensagem("Email não cadastrado");
        }else if (error.code == "auth/wrong-password"){
          this.util.showMensagem("Senha inválida");
        }else{
          this.util.showMensagem("Erro ao fazer login"); 
        }

      });
    }

  }
  criarContaUsuario() {
    this.navCtrl.push(CriarContaPage);
  }
}
