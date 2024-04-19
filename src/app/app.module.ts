import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskComponent } from './components/task/task.component';
import { HeaderComponent } from './components/header/header.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { FormComponent } from './components/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { CommonModule } from '@angular/common';
import { TarefaComponent } from './pages/tarefa/tarefa.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarComponent } from './pages/registrar/registrar.component';
import { RecuperacaoComponent } from './pages/recuperacao/recuperacao.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    TaskListComponent,
    FormComponent,
    EmptyStateComponent,
    HomeComponent,
    TarefaComponent,
    LoginComponent,
    RegistrarComponent,
    RecuperacaoComponent,
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
