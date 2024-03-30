import { Component, OnInit} from '@angular/core';
import WebService from '../../webservice';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: any;
  public tasksCount: number = 0;
  public tasksCountConcluded: number = 0;

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.webService.tasks$.subscribe(tasks => {
      tasks.sort((a: any, b: any)=>{
        if(a.concluida && !b.concluida){
          return 1;
        }else if (!a.concluida && b.concluida) {
          return -1;
        }else{
          return 0;
        }
      })
      this.tasks = tasks;
      this.tasksCount = tasks.length;
      let tasksConcluded = tasks.filter((task: any)=>{
        return task.concluida;
      })
      this.tasksCountConcluded = tasksConcluded.length;
    });
   
    this.webService.getTasks();
  }
}
