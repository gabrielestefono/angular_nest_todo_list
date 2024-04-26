import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/home/home.module').then((module) => module.HomeModule),
  },
  {
    path: 'task/:id',
    loadChildren: () => import('./pages/tarefa/tarefa.module').then((module) => module.TarefaModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then((module) => module.LoginModule),
  },
  {
    path: 'registrar',
    loadChildren: () => import('./pages/registrar/registrar.module').then((module) => module.RegistrarModule),
  },
  {
    path: 'recuperacao',
    loadChildren: () => import('./pages/recuperacao/recuperacao.module').then((module) => module.RecuperacaoModule),
  },
  {
    path: 'confirmacao',
    loadChildren: () => import('./pages/confirmacao/confirmacao.module').then((module) => module.ConfirmacaoModule),
  },
  {
    path: 'confirmar',
    loadChildren: () => import('./pages/confirmar/confirmar.module').then((module) => module.ConfirmarModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
