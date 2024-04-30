import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    private http: HttpClient,
  ){}
  private _backend = "https://angular-nest-todo-list-backend.vercel.app/";

  enviarErro(status: number, descricao: string, pagina: string){
    return this.http.post(`${this._backend}error`, {
      status,
      descricao,
      pagina,
    });
  }
}
