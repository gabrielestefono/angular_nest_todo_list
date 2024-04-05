import { Component } from '@angular/core';
import WebService from '../../../webservice';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent{
  task: string = "";

  constructor(private WebService: WebService) {}

  enviarDados(event: MouseEvent){
    if(this.task != ''){
      event.preventDefault();
      this.WebService.createTask(this.task);
      this.task = '';
    }
  }
}
