const TodoSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((n) => (
          <div key={n} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="h-4 bg-base-300 rounded w-3/4 mb-4"></div>
              <div className="h-3 bg-base-300 rounded w-full mb-2"></div>
              <div className="h-3 bg-base-300 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoSkeleton; 