import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  task: string = "";

  constructor(
    private taskService: TaskService
  ) {}

  enviarDados(event: MouseEvent){
    if(this.task != ''){
      event.preventDefault();
      this.taskService.criarTarefa(this.task).subscribe({
        next: (response) => {
          if(response){
            this.taskService.buscarTarefas();
          }
        },
        error: (error) => console.log(error)
      })
      this.task = '';
    }
  }
}
