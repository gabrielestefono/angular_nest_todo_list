import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

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
          this.cookieService.set('jwt_token', response.jwtToken);
          this.formularioLogin.reset();
          this.router.navigate(["/"])
        },
        error: error => console.log(error)
      })
    }
  }
}
