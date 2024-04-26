import { Component, Input } from '@angular/core';
import { TaskService } from '../../../services/task.service';
import { FormAction } from '../../../models/shared/interfaces/form.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent{
  constructor(
    private taskService: TaskService
  ) {}

  @Input() tarefa?: number;
  public task: string = "";

  handleFormAction(formulario: FormAction): void
  {
    this.enviarDados(formulario);
  }

  enviarDados(formulario: FormAction){
    this.taskService.criarTarefa(formulario.task, 0).subscribe({
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
