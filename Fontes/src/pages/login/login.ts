import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { UserData } from '../../providers/user-data';
//import { CriarContaPage } from '../criar-conta/criar-conta';
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
    private menu: MenuController,
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
    this.menu.enable(false, 'loggedOutMenu');
  }

  onLogin() {
    if (this.form.valid) {
      this.usuario = this.form.value;
      this.authService.logar(this.usuario).then(() => {
        this.userData.login(this.usuario.email);
        this.util.showMensagem('Login realizado com sucesso...', "button")
        this.navCtrl.setRoot(TabsPage);
      }).catch((error: any) => {

        if (error.code == "auth/invalid-email") {
          this.util.showMensagem("Email inválido")
        } else if (error.code == "auth/user-disabled") {
          this.util.showMensagem("Usuário desativado");
        } else if (error.code == "auth/user-not-found") {
          this.util.showMensagem("Email não cadastrado");
        } else if (error.code == "auth/wrong-password") {
          this.util.showMensagem("Senha inválida");
        } else {
          this.util.showMensagem("Erro ao fazer login");
        }

      });
    }

  }
  criarContaUsuario() {

    //this.navCtrl.push(CriarContaPage);
  }
//Em vez de criar uma pagina para login e outra pra criar conta fazer tudo em uma só
  criarConta() {
    let usuario = this.form.value;
    if (this.form.valid) {
      this.authService.criarUsuario(usuario)
        .then((usuario: any) => {
          this.util.showMensagem('Usuário criado com sucesso.');
          this.userData.login(usuario.email);
          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          if (error.code == 'auth/email-already-in-use') {
            this.util.showMensagem('O e-mail digitado já está em uso.');
          } else if (error.code == 'auth/invalid-email') {
            this.util.showMensagem('O e-mail digitado não é valido.');
          } else if (error.code == 'auth/operation-not-allowed') {
            this.util.showMensagem('Não está habilitado criar usuários.');
          } else if (error.code == 'auth/weak-password') {
            this.util.showMensagem('A senha digitada é muito fraca.');
          } else {
            this.util.showMensagem(error.code);
          }
        });
    }else{
      this.util.showMensagem('Insira uma usuário e senha para criar uma conta');
    }
  }
}
