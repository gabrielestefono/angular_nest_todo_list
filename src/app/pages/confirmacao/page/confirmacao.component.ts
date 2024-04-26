import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent{
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
  ){}

  enviarEmailConfirmacao(): void
  {
    this.authService.enviarEmailConfirmacao().subscribe({
      next: response => {
        if(response){
          this.toaster.success('Email enviado, por favor, verifique sua caixa de entrada!')
        }
      },
      error: error => {
        // TODO: Enviar email com mensagem de erro para mim
        console.log(error);
        this.toaster.error("Algo deu errado, por favor, tente novamente em 5 minutos!")
      }
    })
  }
}
