import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.scss'
})
export class ConfirmarComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
    private errorService: ErrorService,
    private loadingService: LoadingService,
  ){}
  public carregando: boolean = true;

  ngOnInit(): void
  {
    this.loadingService.loading(true);
    this.authService.confirmarEmail().subscribe({
      next: response => {
        this.loadingService.loading(false);
        if(response){
          this.toaster.success("Email confirmado com sucesso! Por favor, logue novamente!")
          this.router.navigate(['/login']);
          this.authService.logout()
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loadingService.loading(false);
        if(error.status == 401){
          this.toaster.info('O tempo expirou, por favor, tente novamente!');
          this.authService.logout();
        }
        this.errorService.enviarErro(error.status, error.error.message, 'Confirmar').subscribe({
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
    });
  }
}
