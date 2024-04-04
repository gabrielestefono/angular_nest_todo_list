  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { BehaviorSubject, Observable} from 'rxjs';
  import { tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })

  class WebService {
    public tasks: any;
    private _tasks: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public tasks$: Observable<any> = this._tasks.asObservable();

    constructor(private http: HttpClient){}

    public getTasks(): void {
      this.http.get('https://angular-nest-todo-list-backend.vercel.app/task')
        .pipe(
          tap(response => this._tasks.next(response))
        )
        .subscribe({
          next: response => this.tasks = response,
          error: error => console.log(error)
        });
      }

    public createTask(taskName: string): void {
      this.http.post('https://angular-nest-todo-list-backend.vercel.app/task', {
        nome: taskName,
        concluida: false,
      })
        .pipe(
          tap(() => this.getTasks())
        )
        .subscribe({
          next: response => {},
          error: error => console.log(error)
        });
      }

    public marcarComoConcluido(id: number){
      this.http.patch(`https://angular-nest-todo-list-backend.vercel.app/task/${id}`, {})
        .pipe(
          tap(() => this.getTasks())
        )
        .subscribe({
          next: response => {},
          error: error => console.log(error)
        });  
      }
  
    public excluirTarefa(id: number){
      this.http.delete(`https://angular-nest-todo-list-backend.vercel.app/task/${id}`)
       .pipe(
         tap(() => this.getTasks())
       )
       .subscribe({
        next: response => {},
        error: error => console.log(error)
      });
    }
  }

  export default WebService;
