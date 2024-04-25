import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { LoginComponent } from "./page/login.component";
import { LoginComponentRouter } from "./login.routing";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LoginComponentRouter),
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
  ]
})
export class LoginModule {}
