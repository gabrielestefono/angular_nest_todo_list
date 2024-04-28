import { Routes } from "@angular/router";
import { RecuperarComponent } from "./page/recuperar.component";
import { RecuperacaoService } from "../../auth/recuperacao.service";

export const RecuperarComponentRouting: Routes = [
  {
    path: '',
    component: RecuperarComponent,
    resolve: [RecuperacaoService]
  }
]
