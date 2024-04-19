import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { RecuperacaoComponent } from './pages/recuperacao/recuperacao.component';
import { AcessoAutenticadoService } from './auth/acesso-autenticado.service';
import { AcessoNaoAutenticadoService } from './auth/acesso-nao-autenticado.service';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: [AcessoAutenticadoService]
  },
  {
    path: 'task/:id',
    component: TarefaComponent
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: [AcessoNaoAutenticadoService]
  },
  {
    path: 'registrar',
    component: RegistrarComponent,
    resolve: [AcessoNaoAutenticadoService]
  },
  {
    path: 'recuperacao',
    component: RecuperacaoComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
