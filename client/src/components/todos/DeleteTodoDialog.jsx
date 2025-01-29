import { useState } from 'react';
import Modal from '@/components/common/Modal';
import { todoService } from '@/services/todo.service';

const DeleteTodoDialog = ({ todo, isOpen, onClose, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError('');
      const response = await todoService.deleteTodo(todo._id);
      
      if (response.status === 'success') {
        onDelete();
        onClose();
      } else {
        setError(response.message || 'Failed to delete todo');
      }
    } catch (error) {
      setError('An error occurred while deleting the todo');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 max-w-sm w-full">
        <h3 
          className="text-lg font-bold mb-4" 
          id="modal-title"
        >
          Delete Todo
        </h3>
        
        <p className="mb-4">
          Are you sure you want to delete "{todo.title}"? This action cannot be undone.
        </p>

        {error && (
          <div className="alert alert-error mb-4" role="alert">
            {error}
          </div>
        )}

        <div className="flex justify-end space-x-2">
          <button
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancel
          </button>
          <button
            className={`btn btn-error ${isDeleting ? 'loading' : ''}`}
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteTodoDialog; 