const TodoFilter = ({ filters, onFilterChange }) => {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="form-control">
        <input
          type="text"
          placeholder="Search todos..."
          className="input input-bordered"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
        />
      </div>

      <div className="form-control">
        <select
          className="select select-bordered"
          value={filters.status}
          onChange={(e) => onFilterChange({ status: e.target.value })}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="form-control">
        <select
          className="select select-bordered"
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value })}
        >
          <option value="createdAt">Date Created</option>
          <option value="title">Title</option>
          <option value="status">Status</option>
        </select>
      </div>

      <button
        className="btn btn-ghost"
        onClick={() => onFilterChange({ sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc' })}
      >
        {filters.sortOrder === 'asc' ? '↑' : '↓'}
      </button>
    </div>
  );
};

export default TodoFilter; 