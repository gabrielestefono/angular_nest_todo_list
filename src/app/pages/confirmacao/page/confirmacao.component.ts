import { ErrorService } from './../../../services/error.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-confirmacao',
  templateUrl: './confirmacao.component.html',
  styleUrl: './confirmacao.component.scss'
})
export class ConfirmacaoComponent{
  constructor(
    private authService: AuthService,
    private toaster: ToastrService,
    private readonly router: Router,
    private readonly errorService: ErrorService,
    private loadingService: LoadingService,
  ){}

  enviarEmailConfirmacao(): void
  {
    this.loadingService.loading(true);
    this.authService.enviarEmailConfirmacao().subscribe({
      next: response => {
        this.loadingService.loading(false);
        if(response){
          this.toaster.success('Email enviado, por favor, verifique sua caixa de entrada!')
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.enviarErro(error.status, error.error.message, 'Confirmação').subscribe({
          next: response => {
            this.loadingService.loading(false);
            if(response){
              this.toaster.error('Erro interno! O administrador do website acabou de receber um email sobre este erro!');
            }
          },
          error: response => {
            this.loadingService.loading(false);
            if(response){
              this.toaster.error("Erro! Verifique sua conexão com a internet ou tente novamente mais tarde!");
            }
          }
        })
      }
    })
  }
}
