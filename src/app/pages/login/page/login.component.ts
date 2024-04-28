import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { response } from 'express';

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
    private toaster: ToastrService,
    private errorService: ErrorService,
  ){}

  public formularioLogin = this.formBuilder.group({
    email: ["", [Validators.required, Validators.email]],
    senha: ["", [Validators.required, Validators.minLength(6)]],
  })

  fazerLogin(){
    // TODO: Refatorar código
    // TODO: Melhorar mensagens
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
          }else if(error.status == 401){
            this.toaster.error('Senha inválida!');
            this.formularioLogin.get('senha')!.setErrors({ incorreto: true });
          }
          else{
            this.errorService.enviarErro(error.status, error.error.message, 'login').subscribe({
              next: response => {
                if(response){
                  this.toaster.error('Erro interno! O administrador do website acabou de receber um email sobre este erro!');
                }
              },
              error: response => {
                if(response){
                  this.toaster.error("Erro! Verifique sua conexão com a internet ou tente novamente mais tarde!");
                }
              }
            })
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
