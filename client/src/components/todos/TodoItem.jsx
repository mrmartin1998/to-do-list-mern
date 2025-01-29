import { useState } from 'react';
import { todoService } from '@/services/todo.service';
import EditTodoForm from './EditTodoForm';
import DeleteTodoDialog from './DeleteTodoDialog';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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
    <>
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
            <button 
              onClick={() => setShowDeleteDialog(true)} 
              className="btn btn-error"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <DeleteTodoDialog
        todo={todo}
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onDelete={onDelete}
      />
    </>
  );
};

export default TodoItem; 