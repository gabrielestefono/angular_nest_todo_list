import { ToastrService } from 'ngx-toastr';
import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2'
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorService } from '../../../services/error.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent{
  @Input() task!: Task;
  @Input() filho?: boolean;
  @Input() pai?: number;

  constructor(
    private taskService: TaskService,
    private errorService: ErrorService,
    private toaster: ToastrService,
  ) {}

  editarTarefa(id: number){
    Swal.fire({
      title: "Editar tarefa",
      text: "Digite o nome para a tarefa:",
      color: 'white',
      background: "#1A1A1A",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Alterar",
      confirmButtonColor: '#1E6F9F',
      confirmButtonAriaLabel: "Confirmar alteração",
      cancelButtonText: "Cancelar",
      cancelButtonColor: '#5E60CE',
      cancelButtonAriaLabel: "Cancelar Edição",
      animation:true,
    }).then((resposta)=>{
      if(resposta.isConfirmed){
        this.taskService.editarTarefa(id, resposta.value).subscribe(() =>{
          if(this.filho){
            this.taskService.buscarTarefa(this.pai!);
          }else{
            this.taskService.buscarTarefas();
          }
        })
      }
    })
  }

  marcarComoConcluido(id: number){
    this.taskService.marcarTarefaComoConcluida(id).subscribe({
      next: (response) => {
        if(response){
          if(this.filho){
            this.taskService.buscarTarefa(this.pai!);
          }else{
            this.taskService.buscarTarefas();
          }
        }
      },
      error: (error: HttpErrorResponse) => {
        this.errorService.enviarErro(error.status, error.error.message, 'Task Component').subscribe({
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
  }

  excluirTarefa(id: number){
    Swal.fire({
      animation: true,
      background: '#1A1A1A',
      color: 'white',
      title: "Deletar Tarefa",
      text: "Deseja realmente deletar essa tarefa?",
      confirmButtonText: "Sim",
      confirmButtonColor: '#1E6F9F',
      confirmButtonAriaLabel: "Apagar Tarefa",
      denyButtonText: "Cancelar",
      denyButtonColor: '#5E60CE',
      denyButtonAriaLabel: "Cancelar a ação",
      showCloseButton: true,
      showDenyButton: true,
      focusConfirm: true
    }).then((result)=>{
      if(result.isConfirmed){
        this.taskService.excluirTarefa(id).subscribe({
          next: (response) => {
            if(response){
              if(this.filho){
                this.taskService.buscarTarefa(this.pai!);
              }else{
                this.taskService.buscarTarefas();
              }
            }
          }
        })
      }
    })
  }
}
