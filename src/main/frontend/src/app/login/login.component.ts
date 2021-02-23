import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public email = '';
  public password = '';

  constructor(public auth: AngularFireAuth, private router: Router) {
  }

  loginWithEmail() {
    this.auth.signInWithEmailAndPassword(this.email, this.password).then(() => {
      this.router.navigateByUrl('/');
    });
  }

  loginWithGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
      this.router.navigateByUrl('/');
    });
  }

}
