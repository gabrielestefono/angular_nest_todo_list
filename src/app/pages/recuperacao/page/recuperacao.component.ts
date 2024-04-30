import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrl: './recuperacao.component.scss'
})
export class RecuperacaoComponent {
  constructor(
    private form: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService,
    private readonly errorService: ErrorService,
    private loadingService: LoadingService,
  ){}

  formularioRecuperacao = this.form.group({
    email: ["", [Validators.required, Validators.email]]
  })

  enviarForm(): void
  {
    if(this.formularioRecuperacao.valid){
      this.loadingService.loading(false);
      this.authService.enviarEmailRecuperacao(this.formularioRecuperacao.value.email!).subscribe({
        next: response => {
          this.loadingService.loading(false);
          if(response){
            this.toaster.success("Um email foi enviado para o email informado!");
          }
        },
        error: (error: HttpErrorResponse) => {
          this.errorService.enviarErro(error.status, error.error.message, 'Recuperação (Envio Email)').subscribe({
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
    }else{
      console.log(this.formularioRecuperacao.get('email')?.errors)
      this.formularioRecuperacao.get('email')?.setErrors({invalido: true});
      this.toaster.error("Por favor, verifique o email!");
    }
  }
}
