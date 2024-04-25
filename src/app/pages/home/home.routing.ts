import { AcessoAutenticadoService } from "../../auth/acesso-autenticado.service";
import { HomeComponent } from "./page/home.component";
import { Routes } from "@angular/router";

export const HomeComponentRouter: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [AcessoAutenticadoService]
  }
];
