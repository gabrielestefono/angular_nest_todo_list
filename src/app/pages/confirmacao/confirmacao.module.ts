import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmacaoComponent } from './page/confirmacao.component';
import { RouterModule } from '@angular/router';
import { ConfirmacaoComponentRouter } from './confirmacao.routing';



@NgModule({
  declarations: [
    ConfirmacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfirmacaoComponentRouter)
  ]
})
export class ConfirmacaoModule { }
