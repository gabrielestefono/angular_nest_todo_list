import { Routes } from "@angular/router";
import { ConfirmarComponent } from "./page/confirmar.component";
import { ConfirmacaoService } from "../../auth/confirmacao.service";

export const ConfirmarComponentRouter: Routes = [
  {
    path: '',
    component: ConfirmarComponent,
    resolve: [ConfirmacaoService]
  }
];
