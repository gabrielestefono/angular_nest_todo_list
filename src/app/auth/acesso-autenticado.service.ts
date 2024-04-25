import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AcessoAutenticadoService {
  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ){}

  resolve(){
    const cookie = this.cookieService.get('jwt_token');
    if(!cookie && this.platformId != 'server'){
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  redirecionar(){
    console.log('Opora!');
    this.router.navigate(["/login"]);
  }
}
