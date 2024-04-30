import { CookieService } from 'ngx-cookie-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Task } from '../models/task.interface';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _backend = "https://angular-nest-todo-list-backend.vercel.app/";
  private _tasks = new BehaviorSubject<Task[]>([]);
  private _task = new BehaviorSubject<Task>({
    id: 0,
    nome: '',
    concluida: false,
    created_at: new Date(),
  });

  get tasks(): Observable<Task[]> {
    return this._tasks.asObservable();
  }

  get task(): Observable<Task> {
    return this._task.asObservable();
  }

  constructor(
    private http: HttpClient,
    private readonly cookieService: CookieService,
    private readonly loadingService: LoadingService,
  ) {
    this.buscarTarefas();
  }

  async buscarTarefas()
  {
    this.loadingService.loading(true);
    const token = this.cookieService.get('jwt_token');
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this.http.get<Task[]>(`${this._backend}task`, { headers }).subscribe({
        next: response => {
          this._tasks.next(response);
          this.loadingService.loading(false);
          console.log('Tarefas!');
        },
        error: error => {
          this.loadingService.loading(false);
        }
      });
    }else{
      this.loadingService.loading(false);
    }
  }

  buscarTarefa(id: number): Observable<Task[]> | Subscription
  {
    this.loadingService.loading(true);
    const token = this.cookieService.get('jwt_token');
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<Task>(`${this._backend}task/${id}`, { headers }).subscribe(task => {
        this.loadingService.loading(false);
        this._task.next(task);
      })
    }else{
      this.loadingService.loading(false);
      return  new BehaviorSubject<Task[]>([]);
    }
  }

  criarTarefa(nome: string, elemento_pai: number)
  {
    const token = this.cookieService.get('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this._backend}task`, {
      nome,
      concluida: false,
      elemento_pai,
    }, { headers })
  }

  editarTarefa(id: number, nome: string): Observable<any>
  {
    const token = this.cookieService.get('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this._backend}task/nome/${id}`, {
      nome,
    }, { headers })
  }

  atualizarDescricao(id: number, descricaoComQuebraDeLinha: string){
    const token = this.cookieService.get('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this._backend}task/description/${id}`, {
      description: descricaoComQuebraDeLinha
    }, { headers })
  }

  marcarTarefaComoConcluida(id: number)
  {
    const token = this.cookieService.get('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.patch(`${this._backend}task/${id}`, {}, { headers })
  }

  excluirTarefa(id: number)
  {
    const token = this.cookieService.get('jwt_token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this._backend}task/${id}`, { headers })
  }
}
