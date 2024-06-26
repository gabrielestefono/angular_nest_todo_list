import { Description } from "./description.interface";
import { TaskFilho } from "./task-filho";

export interface Task{
  id: number,
  nome: string,
  concluida: boolean,
  created_at: Date,
  updated_at?: Date,
  description?: Description,
  filhos?: TaskFilho[]
}
