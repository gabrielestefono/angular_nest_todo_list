import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormAction } from '../../../models/shared/interfaces/form.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';
import { AuthService } from '../../../services/auth.service';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  constructor(
    private taskService: TaskService,
    private errorService: ErrorService,
    private toaster :ToastrService,
    private authService: AuthService,
    private loadingService: LoadingService,
  ) {}

  @Input() tarefa?: number;
  public task: string = "";

  handleFormAction(formulario: FormAction): void
  {
    this.enviarDados(formulario);
  }

  enviarDados(formulario: FormAction){
    this.loadingService.loading(true);
    this.taskService.criarTarefa(formulario.task, 0).subscribe({
      next: (response) => {
        this.loadingService.loading(false);
        if(response){
          if(!this.tarefa){
            this.taskService.buscarTarefas();
          }else{
            this.taskService.buscarTarefa(this.tarefa);
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        if(error.status == 401){
          this.loadingService.loading(false);
          this.toaster.info('Por favor, faça login novamente!');
          this.authService.logout();
        }
        this.errorService.enviarErro(error.status, error.error.message, 'Home').subscribe({
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
    this.task = '';
  }
}
