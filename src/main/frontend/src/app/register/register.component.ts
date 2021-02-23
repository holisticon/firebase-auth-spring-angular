import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private auth: AngularFireAuth) {}

  public email = '';
  public password = '';

  public register(): void {
    this.auth.createUserWithEmailAndPassword(this.email, this.password).then(foo => console.log(foo));
  }
}
