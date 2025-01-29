const TodoError = ({ message, onRetry }) => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title justify-center text-error">Error</h2>
        <p>{message}</p>
        <div className="card-actions justify-center mt-4">
          <button onClick={onRetry} className="btn btn-primary">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoError; 