import { useForm } from 'react-hook-form';
import { todoValidation } from '@/utils/formValidation';
import { useEditTodo } from '@/hooks/useEditTodo';

const EditTodoForm = ({ todo, onUpdate, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: todo.title,
      description: todo.description,
      status: todo.status
    }
  });

  const { isSubmitting, apiError, handleSubmit: submitEdit } = useEditTodo(
    todo,
    onUpdate,
    onCancel
  );

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Edit Todo</h2>
        
        {apiError && (
          <div className="alert alert-error" role="alert">
            {apiError}
          </div>
        )}

        <form onSubmit={handleSubmit(submitEdit)} className="space-y-4">
          <div className="form-control">
            <label className="label" htmlFor="edit-title">
              <span className="label-text">Title</span>
            </label>
            <input
              id="edit-title"
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
            <label className="label" htmlFor="edit-description">
              <span className="label-text">Description</span>
            </label>
            <textarea
              id="edit-description"
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
                onChange={(e) => {
                  register('status').onChange(e);
                  e.target.value = e.target.checked ? 'completed' : 'pending';
                }}
                defaultChecked={todo.status === 'completed'}
              />
            </label>
          </div>

          <div className="card-actions justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className="btn btn-ghost"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTodoForm; 