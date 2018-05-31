
import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { usuario } from '../../providers/autenticacao/usuario';
import { AutenticacaoProvider } from '../../providers/autenticacao/autenticacao';
import { TabsPage } from '../tabs-page/tabs-page';

@IonicPage()
@Component({
  selector: 'page-criar-conta',
  templateUrl: 'criar-conta.html',
})
export class CriarContaPage {
  //usuario: usuario = new usuario();
  //@ViewChild('form') form: NgForm;
  form: FormGroup;
  
 
  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private authService: AutenticacaoProvider,
    private formBuilder: FormBuilder) {
        this.form  = this.formBuilder.group({
          email: [null, [Validators.required, Validators.email]],
          password: [null, [Validators.required, Validators.minLength(6)]]
    
        });
      
  }

  criarConta() {
    let usuario = this.form.value;
    if (this.form.valid) {

      let toast = this.toastCtrl.create({ duration: 3000, position: 'buttom' });

      this.authService.criarUsuario(usuario)
        .then((usuario: any) => {
          console.log(usuario);
          toast.setMessage('Usuário criado com sucesso.'); 
          toast.present();

          this.navCtrl.setRoot(TabsPage);
        })
        .catch((error: any) => {
          if (error.code  == 'auth/email-already-in-use') {
            toast.setMessage('O e-mail digitado já está em uso.');
          } else if (error.code  == 'auth/invalid-email') {
            toast.setMessage('O e-mail digitado não é valido.');
          } else if (error.code  == 'auth/operation-not-allowed') {
            toast.setMessage('Não está habilitado criar usuários.');
          } else if (error.code  == 'auth/weak-password') {
            toast.setMessage('A senha digitada é muito fraca.');
          }else {
            
            toast.setMessage(error.code);
          }
          toast.present();
        });
    }
  }

}