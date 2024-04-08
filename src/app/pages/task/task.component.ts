import { Component, OnInit } from '@angular/core';
import WebService from '../../../webservice';
import { ActivatedRoute } from '@angular/router';
import Task from '../../templates/task';
import { error } from 'console';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent implements OnInit{
  public task?: Task;
  public isLoading: boolean = true;

  constructor(private webService: WebService, private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam: string | null = params.get('id');
      if (idParam !== null) {
        const id: number = parseInt(idParam);
        this.webService.getTask(id)
        .then((resultado) => {
          this.task = resultado;
          this.isLoading = false;
        })
        .catch(error => {
          console.log(error);
          this.isLoading = false;
        })
      }
    });
  }
}
