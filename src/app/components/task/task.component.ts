import { Component, Input } from '@angular/core';
import Swal from 'sweetalert2'
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private taskService: TaskService) {}

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
          this.taskService.buscarTarefas();
        })
      }
    })
  }

  marcarComoConcluido(id: number){
    this.taskService.marcarTarefaComoConcluida(id).subscribe({
      next: (response) => {
        if(response){
          this.taskService.buscarTarefas();
        }
      },
      error: (error) =>console.log(error)
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
              this.taskService.buscarTarefas();
            }
          }
        })
      }
    })
  }
}
