import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cookieService: CookieService,
    private router: Router,
  ){}

  public formularioLogin = this.formBuilder.group({
    email: ["", Validators.required],
    senha: ["", Validators.required],
  })

  fazerLogin(){
    if(this.formularioLogin.valid){
      this.authService.login(this.formularioLogin.value.email!, this.formularioLogin.value.senha!).subscribe({
        next: response => {
          const decodedToken = jwtDecode(response.jwtToken);
          const expirationDate = decodedToken.exp;
          console.log(new Date(decodedToken.exp! * 1000))
          this.cookieService.set('jwt_token', response.jwtToken, { expires: new Date(expirationDate! * 1000) });
          this.formularioLogin.reset();
          this.router.navigate(["/"])
        },
        error: error => console.log(error)
      })
    }
  }
}
