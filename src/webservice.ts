import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root' // Isso registra o serviço no módulo raiz, disponibilizando-o para toda a aplicação.
// })
// export class WebService {
//   constructor(private http: HttpClient) {}

//   public getTasks() {
//     return this.http.get('https://angular-nest-todo-list-backend.vercel.app/task');
//   }

//   public marcarComoConcluído() {
//     // Implemente a lógica para marcar uma tarefa como concluída
//   }

//   public excluirTarefa() {
//     // Implemente a lógica para excluir uma tarefa
//   }
// }

@Injectable({
  providedIn: 'root' // Isso registra o serviço no módulo raiz, disponibilizando-o para toda a aplicação.
})

class WebService {
  constructor(private http: HttpClient){}

  public getTasks(): void {
    let tasks;
    this.http.get('https://angular-nest-todo-list-backend.vercel.app/task').subscribe(
      response => tasks = response,
      error => console.log(error)
    )
    return tasks;
  }

  public marcarComoConcluído(id: number){
    this.http.patch(`https://angular-nest-todo-list-backend.vercel.app/task/${id}`, {}).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }

  public excluirTarefa(id: number){
    console.log(`https://angular-nest-todo-list-backend.vercel.app/task/${id}`)
    this.http.delete(`https://angular-nest-todo-list-backend.vercel.app/task/${id}`).subscribe(
      response => console.log(response),
      error => console.log(error)
    )
  }
}

export default WebService;
