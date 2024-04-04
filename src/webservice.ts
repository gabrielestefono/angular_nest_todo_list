  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { BehaviorSubject, Observable} from 'rxjs';
  import { tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root'
  })

  class WebService {
    public tasks: any;
    private _tasks: BehaviorSubject<any> = new BehaviorSubject<any>([]);
    public tasks$: Observable<any> = this._tasks.asObservable();
    private _backend = 'https://angular-nest-todo-list-backend.vercel.app/';

    constructor(private http: HttpClient){}

    public getTasks(): void {
      const headers = new Headers();
      headers.append('Cache-Control', 'no-cache');
    
      fetch('https://angular-nest-todo-list-backend.vercel.app/task', {
        method: 'GET',
        headers: headers,
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.tasks = data;
        this._tasks.next(data);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
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
