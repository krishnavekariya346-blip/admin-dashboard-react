const UserDetail = ({ user }) => {
    if (!user) return <div className="p-8">Loading...</div>;
  
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-4">
          {user.firstName} {user.lastName}
        </h1>
  
        <p>Email: {user.email}</p>
        <p>Phone: {user.phone}</p>
        <p>Gender: {user.gender}</p>
        <p>University: {user.university}</p>
        <p>Company: {user.company?.name}</p>
        <p>Address: {user.address?.city}, {user.address?.state}</p>
      </div>
    );
  };
  
  export default UserDetail;