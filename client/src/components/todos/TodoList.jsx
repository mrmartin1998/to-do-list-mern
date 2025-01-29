import { useState, useEffect } from 'react';
import { todoService } from '@/services/todo.service';
import TodoItem from './TodoItem';
import TodoSkeleton from './TodoSkeleton';
import TodoEmpty from './TodoEmpty';
import TodoError from './TodoError';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <TodoSkeleton />;
  if (error) return <TodoError message={error} onRetry={fetchTodos} />;
  if (todos.length === 0) return <TodoEmpty />;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {todos.map((todo) => (
        <TodoItem
          key={todo._id}
          todo={todo}
          onUpdate={fetchTodos}
          onDelete={fetchTodos}
        />
      ))}
    </div>
  );
};

export default TodoList; 