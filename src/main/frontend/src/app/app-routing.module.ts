import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AngularFireAuthGuardModule, canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectToLoginPage = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, ...canActivate(redirectToLoginPage) },
  { path: '', pathMatch: 'full', redirectTo: 'profile' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AngularFireAuthGuardModule],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
