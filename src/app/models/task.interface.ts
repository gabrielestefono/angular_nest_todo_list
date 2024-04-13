export interface Task{
  id: number,
  nome: string,
  concluida: boolean,
  created_at: Date,
  updated_at?: Date,
  description?: any
}
