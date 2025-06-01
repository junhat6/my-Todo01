import React, { useState, useEffect } from 'react';
import type { Todo, TodoCreateRequest } from './types/Todo';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  // 仮のデータ（後でAPI通信に置き換え）
  useEffect(() => {
    const mockTodos: Todo[] = [
      {
        id: 1,
        title: 'Reactを学ぶ',
        description: 'TypeScriptとReactの基本を習得する',
        completed: false,
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01'),
      },
      {
        id: 2,
        title: 'Spring Bootを学ぶ',
        description: 'バックエンドAPIを作成する',
        completed: true,
        createdAt: new Date('2024-01-02'),
        updatedAt: new Date('2024-01-02'),
      },
    ];
    setTodos(mockTodos);
  }, []);

  const handleAddTodo = (todoRequest: TodoCreateRequest) => {
    const newTodo: Todo = {
      id: Date.now(), // 仮のID生成（後でAPI側で生成）
      title: todoRequest.title,
      description: todoRequest.description,
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, completed: !todo.completed, updatedAt: new Date() }
        : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id: number, title: string, description?: string) => {
    setTodos(todos.map(todo =>
      todo.id === id
        ? { ...todo, title, description, updatedAt: new Date() }
        : todo
    ));
  };

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 TODO アプリ</h1>
        <p>
          完了: {completedCount} / 全体: {totalCount}
        </p>
      </header>

      <main className="app-main">
        <div className="container">
          <TodoForm onAddTodo={handleAddTodo} />
          
          <div className="todos-section">
            <h2>TODOリスト</h2>
            <TodoList
              todos={todos}
              onToggleComplete={handleToggleComplete}
              onDeleteTodo={handleDeleteTodo}
              onUpdateTodo={handleUpdateTodo}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
