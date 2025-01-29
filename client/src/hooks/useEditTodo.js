import { useState } from 'react';
import { todoService } from '@/services/todo.service';

export const useEditTodo = (todo, onUpdate, onCancel) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setApiError('');
      const response = await todoService.updateTodo(todo._id, data);
      
      if (response.status === 'success') {
        onUpdate();
      } else {
        setApiError(response.message || 'Failed to update todo');
      }
    } catch (error) {
      setApiError('An error occurred while updating the todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    apiError,
    handleSubmit
  };
}; 