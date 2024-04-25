import { Routes } from '@angular/router';
import { RecuperacaoComponent } from './page/recuperacao.component';
import { AcessoNaoAutenticadoService } from '../../auth/acesso-nao-autenticado.service';
export const RecuperacaoComponentRouting: Routes = [
  {
    path: '',
    component: RecuperacaoComponent,
    resolve: [AcessoNaoAutenticadoService]
  }
]
