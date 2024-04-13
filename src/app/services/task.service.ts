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

  get tasks(): Observable<Task[]> {
    return this._tasks.asObservable();
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

  buscarTask(id: number)
  {
    return this.http.get<Task>(`${this._backend}task/${id}`);
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
    //TODO: Falta isso ainda, me esqueci totalmente
    return this.http.put(`${this._backend}task`, {})
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
