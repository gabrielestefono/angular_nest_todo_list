import { Component, OnInit} from '@angular/core';
import { Task } from '../../models/task.interface';
import { TaskService } from '../../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: Task[] = [];
  public tasksCount: number = 0;
  public tasksCountConcluded: number = 0;
  private tasksSubscription!: Subscription;

  constructor(private taskService: TaskService){}

  ngOnInit(): void {
    this.tasksSubscription = this.taskService.tasks.subscribe(tasks => {
      const completedTasks = tasks.filter(task => task.concluida === true);
      const uncompletedTasks = tasks.filter(task => task.concluida !== true);
      uncompletedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
      completedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
      const sortedTasks = [...uncompletedTasks, ...completedTasks];
      this.tasks = sortedTasks;
      this.contarParametros();
    });
  }

  ngOnDestroy(): void {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }

  contarParametros(){
    this.tasksCount = this.tasks.length;
    let tasksConcluidas = this.tasks.filter((task) => task.concluida);
    this.tasksCountConcluded = tasksConcluidas.length;
  }
}
