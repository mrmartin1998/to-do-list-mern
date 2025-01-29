import { useState, useEffect, useMemo } from 'react';
import { todoService } from '@/services/todo.service';
import TodoItem from './TodoItem';
import TodoSkeleton from './TodoSkeleton';
import TodoEmpty from './TodoEmpty';
import TodoError from './TodoError';
import CreateTodo from './CreateTodo';
import { useToast } from '@/contexts/ToastContext';

const TodoList = ({ filters }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { showToast } = useToast();

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodos();
      if (response.status === 'success') {
        setTodos(response.data.todos);
      } else {
        setError(response.message);
      }
    } catch (error) {
      setError('Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleCreateClick = () => {
    setShowCreateForm(true);
  };

  const handleCreateSuccess = () => {
    fetchTodos();
    setShowCreateForm(false);
    showToast({ 
      message: 'Todo created successfully!',
      type: 'success'
    });
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      if (filters.status !== 'all' && todo.status !== filters.status) return false;
      if (filters.search && !todo.title.toLowerCase().includes(filters.search.toLowerCase())) return false;
      return true;
    }).sort((a, b) => {
      const order = filters.sortOrder === 'asc' ? 1 : -1;
      if (filters.sortBy === 'title') {
        return order * a.title.localeCompare(b.title);
      }
      if (filters.sortBy === 'status') {
        return order * a.status.localeCompare(b.status);
      }
      return order * (new Date(b.createdAt) - new Date(a.createdAt));
    });
  }, [todos, filters]);

  if (loading) return <TodoSkeleton />;
  if (error) return <TodoError message={error} onRetry={fetchTodos} />;
  if (todos.length === 0 && !showCreateForm) {
    return <TodoEmpty onCreateClick={handleCreateClick} />;
  }

  return (
    <div className="space-y-8">
      {showCreateForm ? (
        <CreateTodo onTodoCreated={handleCreateSuccess} />
      ) : (
        <div className="text-right">
          <button onClick={handleCreateClick} className="btn btn-primary">
            Create New Todo
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onUpdate={fetchTodos}
            onDelete={fetchTodos}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList; 