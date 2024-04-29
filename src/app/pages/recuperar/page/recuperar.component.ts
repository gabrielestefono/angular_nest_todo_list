import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.scss'
})
export class RecuperarComponent {
  constructor(
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService,
    private router: Router,
    private platformLocation: PlatformLocation,
    private errorService: ErrorService,
  ){}

  formRecuperacao = this.formBuilder.group({
    senha: ["", [Validators.required, this.confirmacaoSenhaValidator(), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["\'!@#$%¨&*()-=/*-+\\[\\]{}~^])[A-Za-z0-9"\'!@#$%¨&*()-=/*-+\\[\\]{}~^]{8,}')]],
    confirmacao_senha: ["", [Validators.required, this.confirmacaoSenhaValidator(), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["\'!@#$%¨&*()-=/*-+\\[\\]{}~^])[A-Za-z0-9"\'!@#$%¨&*()-=/*-+\\[\\]{}~^]{8,}')]],
  })

  confirmacaoSenhaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.formRecuperacao) {
        return null;
      }
      return control.value === this.formRecuperacao.controls.senha.value ? null : { 'confirmacaoInvalida': true };
    };
  }

  enviarForm(){
    if(this.formRecuperacao.valid){
      const url = new URL(this.platformLocation.href);
      const token = url.searchParams.get('token');
      if(!token){
        this.toaster.error('Token inválido');
        this.router.navigate(['/login']);
      }
      this.authService.mudarSenha(this.formRecuperacao.value.senha!, token!).subscribe({
        next: response => {
          if(response){
            this.toaster.success("Senha alterada! Por favor, logue novamente");
            this.router.navigate(['/login']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.enviarErro(error.status, error.error.message, 'Recuperar').subscribe({
            next: response => {
              if(response){
                this.toaster.error('Erro interno! O administrador do website acabou de receber um email sobre este erro!');
              }
            },
            error: (error: HttpErrorResponse) => {
              if(error){
                this.toaster.error("Erro! Verifique sua conexão com a internet ou tente novamente mais tarde!");
              }
            }
          })
        }
      })
    }else{
      const formsControlNames: string[] = ['senha', 'confirmacao_senha'];
      formsControlNames.forEach(formsControlName => {
        if(this.formRecuperacao.get(formsControlName)?.errors){
          this.toaster.info(`Por favor, preencha o campo ${formsControlName}`);
          this.formRecuperacao.get(formsControlName)?.setErrors({invalido: true});
        }
      })
    }
  }
}
