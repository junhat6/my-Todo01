import React from 'react';
import type { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: number) => void;
  onDeleteTodo: (id: number) => void;
  onUpdateTodo: (id: number, title: string, description?: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
}) => {
  if (todos.length === 0) {
    return (
      <div className="todo-list-empty">
        <p>TODOがありません。新しいTODOを追加してください。</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDelete={onDeleteTodo}
          onUpdate={onUpdateTodo}
        />
      ))}
    </div>
  );
};

export default TodoList; 