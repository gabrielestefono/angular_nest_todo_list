import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}
  private _backend = "http://localhost:3000/";

  private loginStatus = new BehaviorSubject<boolean>(this.cookieService.get('jwt_token') ? true : false);

  login(email: string, senha: string): Observable<any>
  {
    return this.http.post(`${this._backend}user/login`,
      {
        email,
        senha
      }
    )
  }

  registrar(nome: string, email: string, senha: string, confirmacao_senha: string): Observable<any>
  {
    return this.http.post(`${this._backend}user/registrar`,
      {
        nome,
        email,
        senha,
        confirmacao_senha
      }
    );
  }

  async logout(){
    return this.cookieService.delete('jwt_token');
  }

  enviarEmailConfirmacao()
  {
    const token = this.cookieService.get('jwt_token');
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<boolean>(`${this._backend}user/enviar-confirmacao`, {}, {headers});
    }
    return new Observable<boolean>();
  }

  confirmarEmail()
  {
    const token = this.cookieService.get('jwt_token');
    if(token){
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.get<boolean>(`${this._backend}user/confirmar`, {headers});
    }
    return new Observable<boolean>();
  }

  retornarLogin(): BehaviorSubject<boolean> {
    return this.loginStatus;
  }

  atualizarLoginStatus() {
    const cookie = this.cookieService.get('jwt_token');
    let valor = true;
    if(!cookie){
      valor = false;
    }
    this.loginStatus.next(valor);
  }
}
