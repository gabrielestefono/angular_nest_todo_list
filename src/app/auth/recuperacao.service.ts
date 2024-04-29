import { ToastrService } from 'ngx-toastr';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PlatformLocation, isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecuperacaoService {
  constructor(
    private cookieService: CookieService,
    private router: Router,
    private toaster: ToastrService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private platformLocation: PlatformLocation,
    private authService: AuthService,
  ){}

  getQueryParam(param: string) {
    const url = new URL(this.platformLocation.href);
    return url.searchParams.get(param);
  }

  async resolve(){
    if(!isPlatformBrowser(this.platformId)){
      return false;
    }

    const cookie = this.cookieService.get('jwt_token');
    if(cookie){
      this.router.navigate(['/']);
      this.toaster.info("Usuário já logado! Solicitação de troca de senha inválida!");
      return false;
    }

    const token = this.getQueryParam('token');
    if(!token){
      this.invalidLink();
      return false;
    }

    const tokenDecoded: any = jwtDecode(token);
    if(!tokenDecoded['recovery']){
      this.invalidLink();
      return false;
    }

    return await this.checkTokenValidity(token);
  }

  invalidLink() {
    this.toaster.error("Link inválido!");
    this.router.navigate(['/login']);
  }

  async checkTokenValidity(token: string) {
    return this.authService.verificarSeTokenValido(token).subscribe({
      next: response => {
        if(response){
          return true;
        }
        this.invalidLink();
        return false;
      },
      error: (error: HttpErrorResponse) => {
        this.invalidLink();
        return false;
      }
    })
  }
}
