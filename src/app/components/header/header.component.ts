import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
    private readonly cookieService: CookieService,
  ){}
  private _loginSubscription!: Subscription;

  public logged: boolean = false;

  ngOnInit(): void {
    this.verificarLogin();
  }

  verificarLogin() {
    this._loginSubscription = this.authService.retornarLogin().subscribe({
      next: response => this.logged = response,
    });
  }

  logout(){
    this.authService.logout().then(()=>{
      this.logged = false;
      this.router.navigate(['/login'])
    })
  }
}
