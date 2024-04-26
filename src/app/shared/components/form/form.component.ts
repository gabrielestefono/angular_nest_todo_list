import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormAction } from '../../../models/shared/interfaces/form.interface';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  constructor(
    private form: FormBuilder,
  ){}
  @Input() tarefa!: number;
  @Output() formEvent = new EventEmitter<FormAction>();

  public formModel = this.form.group({
    task: ["", Validators.required]
  })

  public handleFormEvent(): void
  {
    if(this.formModel.valid){
      const formEventData: FormAction = {
        task: this.formModel.value.task!
      };
      // Emitir o valor do evento
      this.formEvent.emit(formEventData);
      this.formModel.reset();
    }
  }
}
