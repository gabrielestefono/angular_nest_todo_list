import { Routes } from "@angular/router";
import { LoginComponent } from "./page/login.component";
import { AcessoNaoAutenticadoService } from "../../auth/acesso-nao-autenticado.service";

export const LoginComponentRouter: Routes = [
  {
    path: '',
    component: LoginComponent,
    resolve: [AcessoNaoAutenticadoService]
  }
];
