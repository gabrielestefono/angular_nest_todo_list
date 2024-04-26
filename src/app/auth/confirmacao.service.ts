import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ConfirmacaoService {

  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ){}

  resolve(){
    if (isPlatformBrowser(this.platformId)) {
      const cookie = this.cookieService.get('jwt_token');
      if(!cookie){
        this.router.navigate(["/login"]);
        return false;
      }
      const jwtDecoded: any = jwtDecode(cookie);
      if(!jwtDecoded['confirmation']){
        this.router.navigate(["/"]);
        return false;
      }
      return true;
    }
    return false;
  }
}
