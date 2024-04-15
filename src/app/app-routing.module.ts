import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { RecuperacaoComponent } from './pages/recuperacao/recuperacao.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'task/:id',
    component: TarefaComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registrar',
    component: RegistrarComponent
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
