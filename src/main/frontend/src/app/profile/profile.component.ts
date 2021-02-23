import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor(public auth: AngularFireAuth, private router: Router) {
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
