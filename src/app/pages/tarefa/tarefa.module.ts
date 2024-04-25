import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TarefaComponentRouting } from './tarefa.routing';
import { TarefaComponent } from './page/tarefa.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TarefaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(TarefaComponentRouting),
    SharedModule
  ]
})
export class TarefaModule { }
