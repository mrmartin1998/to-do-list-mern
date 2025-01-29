import { useState } from 'react';
import { todoService } from '@/services/todo.service';
import EditTodoForm from './EditTodoForm';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusToggle = async () => {
    try {
      await todoService.updateTodo(todo._id, {
        status: todo.status === 'completed' ? 'pending' : 'completed'
      });
      onUpdate();
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      try {
        await todoService.deleteTodo(todo._id);
        onDelete();
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    }
  };

  if (isEditing) {
    return (
      <EditTodoForm
        todo={todo}
        onUpdate={() => {
          onUpdate();
          setIsEditing(false);
        }}
        onCancel={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <input
            type="checkbox"
            checked={todo.status === 'completed'}
            onChange={handleStatusToggle}
            className="checkbox"
          />
          <span className={todo.status === 'completed' ? 'line-through' : ''}>
            {todo.title}
          </span>
        </h2>
        <p>{todo.description}</p>
        <div className="card-actions justify-end">
          <button onClick={() => setIsEditing(true)} className="btn btn-ghost">
            Edit
          </button>
          <button onClick={handleDelete} className="btn btn-error">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem; 