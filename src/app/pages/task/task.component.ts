import { Component, OnInit } from '@angular/core';
import WebService from '../../../webservice';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  public task?: Task;

  constructor(private webService: WebService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam: string | null = params.get('id');
      if (idParam !== null) {
        const id: number = parseInt(idParam);
        this.getTask(id);
      }
    });
  }


  async getTask(id: number): Promise<void> {
    try {
      this.task = await this.webService.getTask(id);
    } catch (error) {
      console.error('Erro ao obter a tarefa:', error);
    }
  }
}
