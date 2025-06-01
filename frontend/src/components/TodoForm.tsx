import React, { useState } from 'react';
import type { TodoCreateRequest } from '../types/Todo';

interface TodoFormProps {
  onAddTodo: (todo: TodoCreateRequest) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim() === '') {
      alert('タイトルを入力してください');
      return;
    }

    onAddTodo({
      title: title.trim(),
      description: description.trim() || undefined,
    });

    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      <h2>新しいTODOを追加</h2>
      <div className="form-group">
        <label htmlFor="title">タイトル *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="何をする必要がありますか？"
          className="form-input"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">説明 (任意)</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="詳細な説明..."
          className="form-textarea"
          rows={3}
        />
      </div>
      <button type="submit" className="submit-btn">
        TODOを追加
      </button>
    </form>
  );
};

export default TodoForm; 