import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  constructor(
    private http: HttpClient,
  ){}
  private _backend = "http://localhost:3000/";

  enviarErro(status: number, descricao: string, pagina: string){
    return this.http.post(`${this._backend}error`, {
      status,
      descricao,
      pagina,
    });
  }
}
