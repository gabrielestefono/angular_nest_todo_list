import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoadingService } from './loading.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private loadingService: LoadingService,
    private router: Router,
    private toaster: ToastrService,
  ) {}
  private _backend = "https://angular-nest-todo-list-backend.vercel.app/";
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
    this.loadingService.loading(true);
    const retorno = this.cookieService.delete('jwt_token');
    this.loadingService.loading(false);
    this.router.navigate(["login"]);
    this.toaster.success("Volte sempre!")
    return retorno;
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

  verificarSeTokenValido(token: string){
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this._backend}user/verificar-token`, {headers});
  }

  enviarEmailRecuperacao(email: string){
    return this.http.post(`${this._backend}user/recuperacao`, {email})
  }

  mudarSenha(senha: string, token: string): Observable<any>
  {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post(`${this._backend}user/mudar-senha`, {senha}, {headers})
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
