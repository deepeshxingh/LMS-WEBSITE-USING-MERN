import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '@/redux/authSlice';
import { toast } from 'sonner';
import axios from 'axios';

function AdminUserPage() {
  const dispatch = useDispatch();
  
  // Destructure users and ensure it's initialized as an empty array if undefined
  const { users = [] } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/getAllUser', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          dispatch(getUsers(data.users)); // Assuming the response contains a 'users' key
        } else {
          const error = await response.json();
          toast.error(error.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch users.");
      }
    };

    

    fetchUsers();
  }, [dispatch]);

  const handleDelete = async (userId) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this user?");
      if (!confirmDelete) {
        return;
      }
      const response = await axios.delete(`http://localhost:8000/api/user/deleteUser/${userId}`);
  
      if (response.data.success) {
        toast.success(response.data.message ||"User deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user. Please try again.");
    }
  };

  const renderUserBoxes = (role) => {
    const filteredUsers = users.filter((user) => user.role === role);

    return filteredUsers.length > 0 ? (
      <div className="bg-white border border-gray-300 rounded-lg p-4 mb-4">
        <h3 className="text-xl font-semibold mb-3">{role.charAt(0).toUpperCase() + role.slice(1)}s</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user) => (
            <div key={user._id} className="border border-gray-200 rounded-lg p-4 shadow-lg">
              <div className='flex justify-between'>
              <div>
              <p className="font-semibold text-lg">{user.name}</p>
              <p className="text-gray-600">{user.email}</p>
              <p className="text-gray-500">Role: {user.role}</p>
              </div>
              <div className='mt-5'>
                <img className='h-16 w-16 rounded-full text-2xl' src={user.photoUrl} alt={user.name.slice(0,2)} />
              </div>
              </div>
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleDelete(user._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
      <p>No {role.charAt(0).toUpperCase() + role.slice(1)} users found.</p>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-center font-bold mb-4"> All Users</h1>

      {/* Render boxes for each role */}
      {renderUserBoxes('admin')}
      {renderUserBoxes('instructor')}
      {renderUserBoxes('student')}
    </div>
  );
}

export default AdminUserPage;
