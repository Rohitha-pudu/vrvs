import React, { useState } from 'react';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import RoleList from '../components/roles/RoleList';
import RoleForm from '../components/roles/RoleForm';

const Dashboard = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null); // State for editing a user
  const [showRoleForm, setShowRoleForm] = useState(false); // Manage role form visiblity

  const handleEditUser = (user) => {
    setSelectedUser(user); // Set the user for editing
    setShowUserForm(true); // Open the UserForm
  };

  const closeUserForm = () => {
    setShowUserForm(false); // Close the UserForm
    setSelectedUser(null); // Reset selected user
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User List Section */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setShowUserForm(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Add User
            </button>
          </div>
          {showUserForm ? (
            <UserForm
              onClose={closeUserForm}
              user={selectedUser} // Pass selected user for editing
            />
          ) : (
            <UserList onEditUser={handleEditUser} /> // Pass onEditUser
          )}
        </div>

        {/* Role Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
          <div className="flex justify-end items-center mb-4">
            <button
              onClick={() => setShowRoleForm(!showRoleForm)}
              className="bg-teal-700 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-all"
            >
              Add Role
            </button>
          </div>
          {showRoleForm ? (
            <RoleForm onClose={() => setShowRoleForm(false)} />
          ) : (
            <RoleList />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
