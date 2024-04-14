import { Description } from "./description.interface";

export interface TaskFilho{
  id: number,
  nome: string,
  concluida: boolean,
  created_at: Date,
  updated_at?: Date,
  description?: Description
}
