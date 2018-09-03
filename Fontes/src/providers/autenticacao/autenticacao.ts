import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { usuario } from './usuario';


/*
  Generated class for the AutenticacaoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AutenticacaoProvider {

  usuario: Observable<firebase.User>;

  constructor(private AngularFireAuth: AngularFireAuth) {
    console.log('Hello AutenticacaoProvider Provider');
  }

  criarUsuario(usuario: usuario) {
    return this.AngularFireAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.password);
  }

  logar(usuario: usuario): Promise<boolean> {
    return this.AngularFireAuth.auth.signInWithEmailAndPassword(usuario.email, usuario.password);
  }

}
