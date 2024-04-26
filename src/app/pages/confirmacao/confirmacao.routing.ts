import { Routes } from "@angular/router";
import { ConfirmacaoComponent } from "./page/confirmacao.component";
import { ConfirmacaoService } from "../../auth/confirmacao.service";

export const ConfirmacaoComponentRouter: Routes = [
  {
    path: '',
    component: ConfirmacaoComponent,
    resolve: [ConfirmacaoService]
  }
];
