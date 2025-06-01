import React, { useState } from 'react';
import type { Todo } from '../types/Todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, title: string, description?: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description || '');

  const handleSave = () => {
    onUpdate(todo.id, editTitle, editDescription);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setEditDescription(todo.description || '');
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="todo-item editing">
        <input
          type="text"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          className="todo-title-input"
          placeholder="タイトル"
        />
        <textarea
          value={editDescription}
          onChange={(e) => setEditDescription(e.target.value)}
          className="todo-description-input"
          placeholder="説明（任意）"
        />
        <div className="todo-actions">
          <button onClick={handleSave} className="save-btn">
            保存
          </button>
          <button onClick={handleCancel} className="cancel-btn">
            キャンセル
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className="todo-checkbox"
      />
      <div className="todo-content">
        <h3 className="todo-title">{todo.title}</h3>
        {todo.description && (
          <p className="todo-description">{todo.description}</p>
        )}
        <small className="todo-date">
          作成日: {new Date(todo.createdAt).toLocaleDateString('ja-JP')}
        </small>
      </div>
      <div className="todo-actions">
        <button onClick={() => setIsEditing(true)} className="edit-btn">
          編集
        </button>
        <button onClick={() => onDelete(todo.id)} className="delete-btn">
          削除
        </button>
      </div>
    </div>
  );
};

export default TodoItem; 