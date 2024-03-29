import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('task')
export class TaskController {
	tasks = [
		{
			id: 1,
			nome: "Task 01",
			concluida: false,
			deletedAt: null
		},
		{
			id: 2,
			nome: "Task 02",
			concluida: false,
			deletedAt: null
		},
		{
			id: 3,
			nome: "Task 03",
			concluida: false,
			deletedAt: null
		},
		{
			id: 4,
			nome: "Task 04",
			concluida: false,
			deletedAt: null
		}
	]

	@Get()
	getAll(){
		return this.tasks;
	}

	@Post()
	create(@Body() body: any){
		this.tasks.push(body);
		return body;
	}

	@Patch(':id')
	markAsConcluded(@Param('id') id: number){
		const task = this.tasks.find(task => task.id === +id);
		task.concluida = true;
		return task;
	}

	@Delete(':id')
	remove(id: number){
		const index = this.tasks.findIndex(task => task.id === id);
		if(index >= 0){
			this.tasks.splice(index, 1);
		}
		return {mensage: "Deletado com sucesso!"}
	}

}
