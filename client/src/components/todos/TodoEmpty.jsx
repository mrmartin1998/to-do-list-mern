const TodoEmpty = () => {
  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="card-title justify-center">No Todos Yet!</h2>
        <p>Create your first todo to get started</p>
        <div className="card-actions justify-center mt-4">
          <button className="btn btn-primary">Create Todo</button>
        </div>
      </div>
    </div>
  );
};

export default TodoEmpty; 