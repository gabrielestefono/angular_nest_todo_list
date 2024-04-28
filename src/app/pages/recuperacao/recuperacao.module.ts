import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RecuperacaoComponentRouting } from './recuperacao.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecuperacaoComponent } from './page/recuperacao.component';



@NgModule({
  declarations: [
    RecuperacaoComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecuperacaoComponentRouting),
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class RecuperacaoModule { }
