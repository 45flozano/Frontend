import { Component } from '@angular/core';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from 'angularx-social-login';
declare var M:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Iniciar Sesion';
  public user:SocialUser | undefined;
  public loggedIn: boolean = false;

  constructor(private authService: SocialAuthService){
    this.authService.authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user != null);
    })
  }

  signInWithGoogle(): void {
    console.log('Google');
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.title = 'Listado de empleados';
  }
  
  signInWithFB(): void {
    console.log('Facebook');
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.title = 'Listado de empleados';
  }
  
  signOut(): void {
    console.log('Salir');
    this.authService.signOut();
    this.title = 'Iniciar Sesion';
  }



}
