import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

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
    private toaster: ToastrService
  ){}

  public formularioLogin = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    senha: ["", [Validators.required, Validators.minLength(6)]],
  })

  fazerLogin(){
    if(this.formularioLogin.valid){
      this.authService.login(this.formularioLogin.value.email!, this.formularioLogin.value.senha!).subscribe({
        next: response => {
          const decodedToken = jwtDecode(response.jwtToken);
          const expirationDate = decodedToken.exp;
          this.cookieService.set('jwt_token', response.jwtToken, { expires: new Date(expirationDate! * 1000) });
          this.formularioLogin.reset();
          this.toaster.success(`Seja bem-vindo(a)!`);
          this.authService.atualizarLoginStatus()
          this.router.navigate(["/"])
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 404){
            this.toaster.error('Usuário não encontrado!');
            this.formularioLogin.get('email')!.setErrors({incorreto: true});
          }
          if(error.status == 401){
            this.toaster.error('Senha inválida!');
            this.formularioLogin.get('senha')!.setErrors({ incorreto: true });
          }
        }
      })
    }else{
      if(this.formularioLogin.get('email')!.errors){
        this.formularioLogin.get('email')!.setErrors({ incorreto: true });
        this.toaster.info('Verifique o campo email!');
      }
      if(this.formularioLogin.get('senha')!.errors){
        this.toaster.info('Verifique o campo senha!');
        this.formularioLogin.get('senha')!.setErrors({ incorreto: true });
      }
    }
  }
}
