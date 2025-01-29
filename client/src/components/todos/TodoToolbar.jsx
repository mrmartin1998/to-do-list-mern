const TodoToolbar = ({ onCreateClick, selectedCount = 0 }) => {
  return (
    <div className="flex items-center gap-4">
      {selectedCount > 0 && (
        <div className="flex items-center gap-2">
          <span className="text-sm">{selectedCount} selected</span>
          <button className="btn btn-error btn-sm">Delete</button>
          <button className="btn btn-primary btn-sm">Mark Complete</button>
        </div>
      )}
      
      <button 
        onClick={onCreateClick}
        className="btn btn-primary"
      >
        Create Todo
      </button>
    </div>
  );
};

export default TodoToolbar; 