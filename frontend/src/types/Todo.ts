export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TodoCreateRequest {
  title: string;
  description?: string;
}

export interface TodoUpdateRequest {
  title?: string;
  description?: string;
  completed?: boolean;
} 