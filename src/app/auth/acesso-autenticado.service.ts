import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutenticadoService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router
  ){}

  resolve(){
    const cookie = this.cookieService.get('jwt_token');
    if(!cookie){
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
