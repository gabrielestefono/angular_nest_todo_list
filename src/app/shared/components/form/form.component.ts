import { Component, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  task: string = "";
  @Input() tarefa?: number;

  constructor(
    private taskService: TaskService
  ) {}

  enviarDados(event: MouseEvent){
    if(this.task != ''){
      event.preventDefault();
      this.taskService.criarTarefa(this.task, this.tarefa ?? 0).subscribe({
        next: (response) => {
          if(response){
            if(!this.tarefa){
              this.taskService.buscarTarefas();
            }else{
              this.taskService.buscarTarefa(this.tarefa);
            }
          }
        },
        error: (error) => console.log(error)
      })
      this.task = '';
    }
  }
}
