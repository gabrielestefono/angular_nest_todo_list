import { Routes } from '@angular/router';
import { RegistrarComponent } from './page/registrar.component';
import { AcessoNaoAutenticadoService } from '../../auth/acesso-nao-autenticado.service';
export const RegistrarComponentRouting: Routes = [
  {
    path: '',
    component: RegistrarComponent,
    resolve: [AcessoNaoAutenticadoService]
  }
]
