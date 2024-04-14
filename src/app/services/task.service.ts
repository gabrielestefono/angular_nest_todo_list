import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private _backend = "http://localhost:3000/";
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

  constructor(private http: HttpClient) {
    this.buscarTarefas();
  }

  buscarTarefas(): void
  {
    this.http.get<Task[]>(`${this._backend}task`).subscribe(tasks => {
      this._tasks.next(tasks);
    });
  }

  buscarTarefa(id: number)
  {
    return this.http.get<Task>(`${this._backend}task/${id}`).subscribe(task => {
      this._task.next(task);
    })
  }

  criarTarefa(nome: string)
  {
    return this.http.post(`${this._backend}task`, {
      nome,
      concluida: false
    })
  }

  editarTarefa(id: number, nome: string): Observable<any>
  {
    console.log(id)
    return this.http.patch(`${this._backend}task/nome/${id}`, {
      nome,
    })
  }

  atualizarDescricao(id: number, descricaoComQuebraDeLinha: string){
    return this.http.patch(`${this._backend}task/description/${id}`, {
      description: descricaoComQuebraDeLinha
    })
  }

  marcarTarefaComoConcluida(id: number)
  {
    return this.http.patch(`${this._backend}task/${id}`, {})
  }

  excluirTarefa(id: number)
  {
    return this.http.delete(`${this._backend}task/${id}`)
  }
}
