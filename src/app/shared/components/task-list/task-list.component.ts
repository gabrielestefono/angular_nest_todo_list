import { Component, Input, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../services/task.service';
import { Task } from '../../../models/task.interface';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { ErrorService } from '../../../services/error.service';

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
  @Input() filhos?: Task[];
  @Input() tarefa?: number;

  constructor(
    private taskService: TaskService,
    private toaster: ToastrService,
    private authService: AuthService,
    private errorService: ErrorService,
  ){}

  ngOnInit(): void {
    if(this.filhos){
      this.tasks = this.filhos;
      this.tasksSubscription = this.taskService.task.subscribe({
        next: tasks => {
          const completedTasks = tasks.filhos!.filter(task => task.concluida === true);
          const uncompletedTasks = tasks.filhos!.filter(task => task.concluida !== true);
          uncompletedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
          completedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
          const sortedTasks = [...uncompletedTasks, ...completedTasks];
          this.tasks = sortedTasks;
          this.contarParametros();
        },
        error: (error: HttpErrorResponse) => {
          if(error.status == 401){
            this.toaster.info('O tempo expirou, por favor, logue novamente!');
            this.authService.logout();
          }
          this.errorService.enviarErro(error.status, error.error.message, 'Task List Component 01').subscribe({
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
      });
    }else{
        this.tasksSubscription = this.taskService.tasks.subscribe({
          next: tasks => {
            const completedTasks = tasks.filter(task => task.concluida === true);
            const uncompletedTasks = tasks.filter(task => task.concluida !== true);
            uncompletedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
            completedTasks.sort((a, b) => a.nome.localeCompare(b.nome));
            const sortedTasks = [...uncompletedTasks, ...completedTasks];
            this.tasks = sortedTasks;
            this.contarParametros();
          },
          error: (error: HttpErrorResponse) => {
            if(error.status == 401){
              this.toaster.info('O tempo expirou, por favor, logue novamente!');
              this.authService.logout();
            }
            this.errorService.enviarErro(error.status, error.error.message, 'Task List Component 02').subscribe({
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
        });
    }
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
