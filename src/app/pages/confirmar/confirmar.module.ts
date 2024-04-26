import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmarComponent } from './page/confirmar.component';
import { RouterModule } from '@angular/router';
import { ConfirmarComponentRouter } from './confirmar.routing';



@NgModule({
  declarations: [
    ConfirmarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConfirmarComponentRouter)
  ]
})
export class ConfirmarModule { }
