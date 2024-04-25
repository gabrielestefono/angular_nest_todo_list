import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecuperacaoComponentRouting } from './recuperacao.routing';
import { RecuperacaoComponent } from './page/recuperacao.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    RecuperacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecuperacaoComponentRouting),
    SharedModule
  ]
})
export class RecuperacaoModule { }
