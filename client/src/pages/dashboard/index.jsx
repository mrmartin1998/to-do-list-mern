import { useState } from 'react';
import TodoList from '@/components/todos/TodoList';
import TodoFilter from '@/components/todos/TodoFilter';
import TodoToolbar from '@/components/todos/TodoToolbar';

const DashboardPage = () => {
  const [filters, setFilters] = useState({
    status: 'all',
    search: '',
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Tasks</h1>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <TodoFilter 
            filters={filters} 
            onFilterChange={handleFilterChange} 
          />
          <TodoToolbar />
        </div>

        <TodoList filters={filters} />
      </div>
    </div>
  );
};

export default DashboardPage; 