import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { todoService } from '@/services/todo.service';
import { todoValidation } from '@/utils/formValidation';

const CreateTodo = ({ onTodoCreated }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      status: false
    }
  });

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setApiError('');
      
      // Ensure status is set properly
      const todoData = {
        ...data,
        status: data.status ? 'completed' : 'pending'
      };

      const response = await todoService.createTodo(todoData);
      
      if (response.status === 'success') {
        reset();
        onTodoCreated();
      } else {
        setApiError(response.message || 'Failed to create todo');
      }
    } catch (error) {
      setApiError('An error occurred while creating the todo');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Create New Todo</h2>
        
        {apiError && (
          <div className="alert alert-error" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="title">
              <span className="label-text">Title</span>
            </label>
            <input
              id="title"
              type="text"
              className={`input input-bordered ${errors.title ? 'input-error' : ''}`}
              {...register('title', todoValidation.title)}
              aria-invalid={errors.title ? 'true' : 'false'}
            />
            {errors.title && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.title.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label" htmlFor="description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="description"
              className={`textarea textarea-bordered h-24 ${errors.description ? 'textarea-error' : ''}`}
              {...register('description', todoValidation.description)}
              aria-invalid={errors.description ? 'true' : 'false'}
            />
            {errors.description && (
              <label className="label">
                <span className="label-text-alt text-error">{errors.description.message}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Mark as completed</span>
              <input
                type="checkbox"
                className="checkbox"
                {...register('status')}
                defaultChecked={false}
              />
            </label>
          </div>

          <button 
            type="submit" 
            className={`btn btn-primary w-full ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Todo'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateTodo; 