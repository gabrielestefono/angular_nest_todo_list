import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './page/home.component';
import { HomeComponentRouter } from './home.routing';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(HomeComponentRouter),
    SharedModule,
  ]
})
export class HomeModule { }
