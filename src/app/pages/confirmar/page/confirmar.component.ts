import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.scss'
})
export class ConfirmarComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private router: Router,
    private toaster: ToastrService,
  ){}
  public carregando: boolean = true;

  ngOnInit(): void
  {
    this.authService.confirmarEmail().subscribe({
      next: response => {
        if(response){
          this.toaster.success("Email confirmado com sucesso! Por favor, logue novamente!")
          this.router.navigate(['/login']);
          this.authService.logout()
        }
      },
      error: error => {
        this.toaster.error("Ocorreu um erro, tente novamente mais tarde!");
      }
    });
  }
}
