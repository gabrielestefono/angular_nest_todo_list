import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-recuperacao',
  templateUrl: './recuperacao.component.html',
  styleUrl: './recuperacao.component.scss'
})
export class RecuperacaoComponent {
  constructor(
    private form: FormBuilder,
    private toaster: ToastrService,
    private authService: AuthService
  ){}

  formularioRecuperacao = this.form.group({
    email: ["", [Validators.required, Validators.email]]
  })

  enviarForm(): void
  // TODO:  Colocar mensagens de feedback mais intuitivas
  {
    if(this.formularioRecuperacao.valid){
      this.authService.enviarEmailRecuperacao(this.formularioRecuperacao.value.email!).subscribe({
        next: response => {
          if(response){
            this.toaster.success("Um email foi enviado para o email informado!");
          }
        },
        error: error => {
          this.toaster.error("Ocorreu um erro, tente novamente em alguns minutos!")
        }
      })
    }else{
      console.log(this.formularioRecuperacao.get('email')?.errors)
      this.formularioRecuperacao.get('email')?.setErrors({invalido: true});
      this.toaster.error("Por favor, verifique o email!");
    }
  }
}
