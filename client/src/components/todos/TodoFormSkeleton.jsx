const TodoFormSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-xl animate-pulse">
      <div className="card-body">
        <div className="h-8 bg-base-300 rounded w-1/4 mb-4"></div>
        <div className="space-y-4">
          <div className="h-10 bg-base-300 rounded w-full"></div>
          <div className="h-24 bg-base-300 rounded w-full"></div>
          <div className="h-10 bg-base-300 rounded w-1/3"></div>
        </div>
      </div>
    </div>
  );
};

export default TodoFormSkeleton; 