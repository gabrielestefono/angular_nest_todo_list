import { Component } from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})
export class TarefaComponent {
  public task?: Task;
  public isLoading: boolean = true;

  constructor(private taskService: TaskService, private route: ActivatedRoute){}

  ngOnInit(): void {
    let id!: number;
    this.route.paramMap.subscribe(params => {
      if(params.get('id') != undefined){
        id = parseInt(params.get('id')!);
        this.taskService.buscarTask(id).subscribe(task => {
          this.task = task;
          console.log(task.description);
        })
      }
    });
  }
}
