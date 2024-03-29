import { Component, OnInit } from '@angular/core';
import WebService from '../../webservice';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  public tasks: any;

  constructor(private webService: WebService) { }

  ngOnInit(): void {
    this.getTasks();
  }

  public getTasks(): void {
    this.tasks = this.webService.getTasks();
  }
}
