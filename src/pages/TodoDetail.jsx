const TodoDetail = ({ todo }) => {
    if (!todo) return <div className="p-8">Loading...</div>;
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-4">{todo.todo}</h1>
  
        <p>Status:
          <span className={`ml-2 px-3 py-1 rounded-full ${
            todo.completed ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}>
            {todo.completed ? "Completed" : "Pending"}
          </span>
        </p>
  
        <p className="mt-4">User ID:{todo.userId}</p> 
      </div>
    );
  };
  
  export default TodoDetail;