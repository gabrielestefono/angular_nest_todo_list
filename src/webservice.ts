  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { BehaviorSubject, Observable} from 'rxjs';

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
        if (response.status == 200) {
          return response.json();
        }
        throw new Error('Network response was not ok');
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
      fetch(`${this._backend}task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: taskName,
          concluida: false,
        })
      })
      .then(response => {
        if(response.status == 201){
          this.getTasks();
        }else{
          throw new Error('Houve um problema com a solicitação fetch:');
        }
      })
      .catch(error => console.error('Houve um problema com a solicitação fetch:', error));
      }

    public marcarComoConcluido(id: number){
      fetch(`${this._backend}task/${id}`, {
        method: 'PATCH',
      }).then(response => {
        if(response.status == 200){
          this.getTasks();
        }else{
          throw new Error('Houve um problema com a solicitação fetch:');
        }
      })
      .catch(error => console.error('Houve um problema com a solicitação fetch:', error));
    };

    public excluirTarefa(id: number)
    {
      fetch(`${this._backend}task/${id}`, {
        method: 'DELETE',
      }).then(response => {
        if(response.status == 200){
            this.getTasks();
        }else{
          throw new Error('Houve um problema com a solicitação fetch:');
        }
      })
      .catch(error => console.error('Houve um problema com a solicitação fetch:', error));
    }
  }
  export default WebService;
