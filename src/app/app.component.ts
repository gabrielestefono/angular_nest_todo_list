import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  constructor(
    private authService: AuthService,
    private router: Router,
  ){}

  title = 'To Do List';

  logout(){
    this.authService.logout().then(()=>{
      this.router.navigate(['/login'])
    })
  }
}
