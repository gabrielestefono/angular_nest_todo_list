import { Routes } from '@angular/router';
import { TarefaComponent } from './page/tarefa.component';
import { AcessoAutenticadoService } from '../../auth/acesso-autenticado.service';
export const TarefaComponentRouting: Routes = [
  {
    path: '',
    component: TarefaComponent,
    resolve: [AcessoAutenticadoService]
  }
]
