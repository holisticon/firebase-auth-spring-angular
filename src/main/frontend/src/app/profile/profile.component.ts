import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

interface ProfileData {
  nickname: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData$: Observable<ProfileData>;

  constructor(public auth: AngularFireAuth, private router: Router) {
    this.profileData$ = this.retrieveProfileData();
  }

  private retrieveProfileData(): Observable<ProfileData> {
    return of({nickname: 'Langweilig'});
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
