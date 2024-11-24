import React, { useState } from 'react';
import UserList from '../components/users/UserList';
import UserForm from '../components/users/UserForm';
import RoleList from '../components/roles/RoleList';


const Dashboard = () => {
  const [showUserForm, setShowUserForm] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRoleForm, setShowRoleForm] = useState(false);

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowUserForm(true);
  };

  const closeUserForm = () => {
    setShowUserForm(false);
    setSelectedUser(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* User List Section */}
        <div className="col-span-2 bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-2">
            <button
              onClick={() => setShowUserForm(true)}
              className="w-full sm:w-auto bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all"
            >
              Add User
            </button>
          </div>
          {showUserForm ? (
            <UserForm onClose={closeUserForm} user={selectedUser} />
          ) : (
            <UserList onEditUser={handleEditUser} />
          )}
        </div>

        {/* Role Section */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-1 bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
            <RoleList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
