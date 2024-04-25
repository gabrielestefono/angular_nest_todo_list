import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) {}
  private _backend = "http://localhost:3000/";

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
    )
  }

  async logout(){
    return this.cookieService.delete('jwt_token');
  }
}
