import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './page/registrar.component';
import { RouterModule } from '@angular/router';
import { RegistrarComponentRouting } from './registrar.routing';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RegistrarComponentRouting),
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RegistrarModule { }
