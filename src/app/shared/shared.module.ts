import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskListComponent } from './components/task-list/task-list.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { TaskComponent } from './components/task/task.component';
import { FormComponent } from './components/form/form.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    TaskListComponent,
    EmptyStateComponent,
    TaskComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TaskListComponent,
    EmptyStateComponent,
    TaskComponent,
    FormComponent
  ]
})
export class SharedModule { }
