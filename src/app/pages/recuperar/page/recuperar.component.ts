import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';

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
  ){}

  formRecuperacao = this.formBuilder.group({
    senha: ["", [Validators.required]],
    confirmacao_senha: ["", [Validators.required]],
  })

  enviarForm(){
    // TODO:  Fazer verificação se a senha é forte
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
        error: error => {
          this.toaster.error('Ocorreu algum erro, tente novamente mais tarde')
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
