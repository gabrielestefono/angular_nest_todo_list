import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskComponent } from './task/task.component';
import { TaskListComponent } from './task-list/task-list.component';
import { FormComponent } from './form/form.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { EmptyStateComponent } from './empty-state/empty-state.component';
import WebService from '../webservice';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    TaskListComponent,
    FormComponent,
    EmptyStateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    WebService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
