import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrl: './registrar.component.scss'
})
export class RegistrarComponent {

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ){}

  public formularioRegistro = this.formBuilder.group({
    nome: ["", Validators.required],
    email: ["", Validators.required],
    senha: ["", Validators.required],
    senha_confirmacao: ["", Validators.required],
  })

  criarUsuario(){
    if(this.formularioRegistro.valid){
      this.authService.registrar(
        this.formularioRegistro.value.nome!,
        this.formularioRegistro.value.email!,
        this.formularioRegistro.value.senha!,
        this.formularioRegistro.value.senha_confirmacao!
      ).subscribe({
        next: response => {
          if(response){
            this.router.navigate(["/login"]);
          }
        },
        error: error => console.log(error)
      })
    }
  }
}
