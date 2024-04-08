class Task{
  public id: number;
  public nome: string;
  public concluida: boolean;
  public descricao?: string;

  constructor(id:number, nome:string, concluida: boolean, descricao?: string){
    this.id = id;
    this.nome = nome;
    this.concluida = concluida;
    this.descricao = descricao;
  }
}

export default Task;
