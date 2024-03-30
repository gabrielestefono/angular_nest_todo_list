import { Component, Input } from '@angular/core';
import WebService from '../../webservice';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task: any;

  constructor(private WebService: WebService) {}

  marcarComoConcluido(id: number){
    this.WebService.marcarComoConcluido(id);
  }

  excluirTarefa(id: number){
    this.WebService.excluirTarefa(id);
  }
}
