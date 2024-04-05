import { Component, Input } from '@angular/core';
import WebService from '../../webservice';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: any;

  constructor(private WebService: WebService) {}

  marcarComoConcluido(id: number){
    this.WebService.marcarComoConcluido(id);
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
    }).then((result)=>{
      if(result.isConfirmed){
        this.WebService.excluirTarefa(id);
      }
    })
  }
}
