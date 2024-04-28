import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecuperarComponent } from './page/recuperar.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RecuperarComponentRouting } from './recuperar.routing';



@NgModule({
  declarations: [
    RecuperarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecuperarComponentRouting),
    ReactiveFormsModule
  ]
})
export class RecuperarModule { }
