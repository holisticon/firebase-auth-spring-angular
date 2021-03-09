import { Component, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface ProfileData {
  nickname: string;
  elo: number;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  profileData$: Subject<ProfileData> = new Subject<ProfileData>();

  constructor(public auth: AngularFireAuth, private router: Router, private http: HttpClient) {
    this.updateProfileData();
  }

  private updateProfileData(): void {
    this.http.get<ProfileData>('/api/profile').subscribe((profileData) => {
      this.profileData$.next(profileData);
    });
  }

  addElo(): void {
    this.http.put<ProfileData>('/api/profile/elo', {
      delta: Math.floor(Math.random() * 100),
    }).subscribe(updatedProfile => {
      this.profileData$.next(updatedProfile);
    });
  }

  logout() {
    this.auth.signOut().then(() => {
      this.router.navigateByUrl('login');
    });
  }
}
