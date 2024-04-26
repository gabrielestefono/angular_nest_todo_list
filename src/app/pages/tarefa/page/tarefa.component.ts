import { Component } from '@angular/core';
import { Task } from '../../../models/task.interface';
import { TaskService } from '../../../services/task.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { FormAction } from '../../../models/shared/interfaces/form.interface';

@Component({
  selector: 'app-tarefa',
  templateUrl: './tarefa.component.html',
  styleUrl: './tarefa.component.scss'
})

export class TarefaComponent {
  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute
  ){
    this.route.paramMap.subscribe(params => {
      if(params.get('id') != undefined){
        this.id = parseInt(params.get('id')!);
        this.taskService.buscarTarefa(this.id)
      }
    });
  }

  private taskSubscription!: Subscription;
  public task?: Task;
  public id!: number;
  public isLoading: boolean = true;

  ngOnInit(): void {
    let id!: number;
    this.route.paramMap.subscribe(params => {
      if(params.get('id') != undefined){
        this.taskSubscription = this.taskService.task.subscribe(task => {
          this.task = task;
        })
      }
    });
  }

  handleFormAction(formulario: FormAction): void
  {
    this.enviarDados(formulario);
  }

  enviarDados(homeAction: FormAction){
    this.taskService.criarTarefa(homeAction.task, this.id).subscribe({
      next: (response) => {
        if(response){
          this.taskService.buscarTarefa(this.id);
        }
      },
      error: (error) => console.log(error)
    })
  }

  adicionarDescricao(event: MouseEvent){
    event.preventDefault();
    Swal.fire({
      title: "Adicionar Descrição",
      text: "Por favor, digite a descrição da tarefa",
      color: 'white',
      background: "#1A1A1A",
      input: "textarea",
      showCancelButton: true,
      confirmButtonText: "Adicionar",
      confirmButtonColor: '#1E6F9F',
      confirmButtonAriaLabel: "Confirmar Descrição",
      cancelButtonText: "Cancelar",
      cancelButtonColor: '#5E60CE',
      cancelButtonAriaLabel: "Cancelar Alteração",
      animation:true,
    })
    .then((resposta) => {
      if(resposta.isConfirmed){
        const descricao = resposta.value;
        const descricaoComQuebraDeLinha = descricao.replace(/\n/g, "<br>");
        this.taskService.atualizarDescricao(this.task!.id, descricaoComQuebraDeLinha).subscribe(()=>{
          this.taskService.buscarTarefa(this.task!.id);
        })
      }
    })
  }

  alterarDescricao(event: MouseEvent){
    event.preventDefault();
    Swal.fire({
      title: "Adicionar Descrição",
      text: "Por favor, digite a descrição da tarefa",
      color: 'white',
      background: "#1A1A1A",
      input: "textarea",
      inputValue: this.task!.description?.description,
      showCancelButton: true,
      confirmButtonText: "Adicionar",
      confirmButtonColor: '#1E6F9F',
      confirmButtonAriaLabel: "Confirmar Descrição",
      cancelButtonText: "Cancelar",
      cancelButtonColor: '#5E60CE',
      cancelButtonAriaLabel: "Cancelar Alteração",
      animation:true,
    })
    .then((resposta) => {
      if(resposta.isConfirmed){
        const descricao = resposta.value;
        const descricaoComQuebraDeLinha = descricao.replace(/\n/g, "<br>");
        this.taskService.atualizarDescricao(this.task!.id, descricaoComQuebraDeLinha).subscribe(()=>{
          this.taskService.buscarTarefa(this.task!.id);
        })
      }
    })
  }
}
