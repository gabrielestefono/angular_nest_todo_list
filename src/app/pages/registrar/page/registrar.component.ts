import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AbstractControl, FormBuilder, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toaster: ToastrService,
    private errorService: ErrorService,
    private loadingService: LoadingService,
  ){}

  public formularioRegistro = this.formBuilder.group({
    nome: ["", [Validators.required, Validators.minLength(3)]],
    email: ["", [Validators.required, Validators.email]],
    senha: ["", [Validators.required, Validators.minLength(8), this.confirmacaoSenhaValidator(), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["\'!@#$%¨&*()-=/*-+\\[\\]{}~^])[A-Za-z0-9"\'!@#$%¨&*()-=/*-+\\[\\]{}~^]{8,}')]],
    senha_confirmacao: ["", [Validators.required, Validators.minLength(6), this.confirmacaoSenhaValidator(), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*["\'!@#$%¨&*()-=/*-+\\[\\]{}~^])[A-Za-z0-9"\'!@#$%¨&*()-=/*-+\\[\\]{}~^]{8,}')]],
  })

  confirmacaoSenhaValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!this.formularioRegistro) {
        return null;
      }
      return control.value === this.formularioRegistro.controls.senha.value ? null : { 'confirmacaoInvalida': true };
    };
  }

  criarUsuario(){
    if(this.formularioRegistro.valid){
      this.registrarUsuario();
    }else{
      this.validarCampos();
    }
  }

  registrarUsuario() {
    this.loadingService.loading(true);
    this.authService.registrar(
      this.formularioRegistro.value.nome!,
      this.formularioRegistro.value.email!,
      this.formularioRegistro.value.senha!,
      this.formularioRegistro.value.senha_confirmacao!
    ).subscribe({
      next: response => {
        this.loadingService.loading(false);
        if(response){
          this.toaster.success("Registrado com Sucesso! Por favor, faça login!");
          this.router.navigate(["/login"]);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.enviarErro(error.status, error.error.message, 'Registrar').subscribe({
          next: response => {
            this.loadingService.loading(false);
            if(response){
              this.toaster.error('Erro interno! O administrador do website acabou de receber um email sobre este erro!');
            }
          },
          error: (error: HttpErrorResponse) => {
            this.loadingService.loading(false);
            if(error){
              this.toaster.error("Erro! Verifique sua conexão com a internet ou tente novamente mais tarde!");
            }
          }
        })
      }
    })
  }

  validarCampos() {
    const campos = ['nome', 'email', 'senha', 'senha_confirmacao'];
    for (let campo of campos) {
      if(this.formularioRegistro.get(campo)!.errors){
        this.exibirMensagensDeErro(campo);
        this.formularioRegistro.get(campo)!.setErrors({invalido: true});
      }
    }
  }

  exibirMensagensDeErro(campo: string) {
    const erros = this.formularioRegistro.get(campo)!.errors;
    const mensagens: any = {
      'required': `O campo ${campo} deve ser preenchido!`,
      'minlength': `O campo ${campo} deve ter no mínimo ${campo === 'senha' || campo === 'senha_confirmacao' ? '8' : '3'} letras!`,
      'confirmacaoInvalida': "Senha e confirmação devem ser idênticas",
      'pattern': `${campo.charAt(0).toUpperCase() + campo.slice(1)} deve conter letras maiúsculas, minúsculas, numeros e pelo menos um símbolo!`,
      'email': "O campo email deve ser do tipo email!"
    };
    for (let erro in erros) {
      if (mensagens[erro]) {
        this.toaster.info(mensagens[erro]);
      }
    }
  }
}
