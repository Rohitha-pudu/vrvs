import React, { useContext, useState } from 'react';
import { RBACContext } from '../../context/RBACContext';
import { formatDistanceToNow } from 'date-fns';
import { FaClock, FaEdit, FaTrash, FaTimes, FaSearch } from 'react-icons/fa';

const UserList = () => {
  const { users, deleteUser, updateUser } = useContext(RBACContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

  const handleEditClick = (user) => {
    setEditingUser(user);
    setIsEditing(true);
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const updatedUser = {
      ...editingUser,
      name: e.target.name.value,
      role: e.target.role.value,
      status: e.target.status.value,
      email: e.target.email.value,
    };

    updateUser(editingUser.id, updatedUser);
    setIsEditing(false);
    setEditingUser(null);
  };

  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setIsDeleting(true);
  };

  const confirmDelete = () => {
    deleteUser(userToDelete.id);
    setIsDeleting(false);
    setUserToDelete(null);
  };

  const cancelDelete = () => {
    setIsDeleting(false);
    setUserToDelete(null);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter users by role and status
  const filteredUsers = users
    .filter((user) => {
      return (
        (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (selectedRole === 'All' || user.role === selectedRole) &&
        (selectedStatus === 'All' || user.status === selectedStatus)
      );
    })
    .sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      }
      if (sortBy === 'role') {
        return sortOrder === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      }
      if (sortBy === 'lastActivity') {
        return sortOrder === 'asc'
          ? new Date(a.lastActivity) - new Date(b.lastActivity)
          : new Date(b.lastActivity) - new Date(a.lastActivity);
      }
      return 0;
    });

  return (
    <div className="p-4 sm:p-6">
      {isEditing ? (
        <form
          onSubmit={handleUpdateUser}
          className="space-y-4 bg-white p-4 sm:p-6 rounded-lg shadow-lg max-w-xl mx-auto"
        >
          <h2 className="text-2xl font-semibold">Edit User</h2>
          <div className="flex flex-col gap-2">
            <label>Name</label>
            <input
              type="text"
              name="name"
              defaultValue={editingUser.name}
              className="border border-gray-400 p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Role</label>
            <select
              name="role"
              defaultValue={editingUser.role}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Status</label>
            <select
              name="status"
              defaultValue={editingUser.status}
              className="border border-gray-300 p-2 rounded"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="email"
              name="email"
              defaultValue={editingUser.email}
              className="border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="flex gap-4">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Update User
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div>
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="flex items-center gap-2 w-full sm:w-auto mb-4 sm:mb-0">
              <FaSearch />
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-gray-300 p-2 rounded w-full sm:w-80"
              />
            </div>

            <div className="flex gap-4 w-full sm:w-auto flex-wrap justify-between sm:justify-start">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="bg-gray-700 text-white border border-black p-2 rounded mb-2 sm:mb-0 w-full sm:w-auto"
              >
                <option value="All">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="bg-gray-700 text-white border border-gray-300 p-2 rounded mb-2 sm:mb-0 w-full sm:w-auto"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-gray-700 text-white border border-gray-300 p-2 rounded mb-2 sm:mb-0 w-full sm:w-auto"
              >
                <option value="name">Sort by Name</option>
                <option value="role">Sort by Role</option>
                <option value="lastActivity">Sort by Last Activity</option>
              </select>

              <button
                onClick={() =>
                  setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
                }
                className="border border-gray-300 p-2 rounded w-full sm:w-auto"
              >
                {sortOrder === 'asc' ? '↑' : '↓'}
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse bg-gradient-to-r from-blue-50 to-green-50 shadow-lg rounded-lg overflow-hidden">
              <thead className="bg-gradient-to-r from-blue-100 to-green-100">
                <tr>
                  <th className="border-b border-gray-300 text-left px-4 py-2 text-sm font-bold text-gray-800">
                    Account
                  </th>
                  <th className="border-b border-gray-300 text-left px-4 py-2 text-sm font-bold text-gray-800">
                    Role
                  </th>
                  <th className="border-b border-gray-300 text-left px-4 py-2 text-sm font-bold text-gray-800">
                    Email
                  </th>
                  <th className="border-b border-gray-300 text-left px-4 py-2 text-sm font-bold text-gray-800">
                    Status
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-sm font-bold text-gray-800">
                    Last Activity
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-sm font-bold text-gray-800">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      {user.name}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      {user.role}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      {user.email}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      {user.status}
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <FaClock />
                        {formatDistanceToNow(new Date(user.lastActivity), {
                          addSuffix: true,
                        })}
                      </div>
                    </td>
                    <td className="border-b border-gray-200 px-4 py-2 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="bg-blue-500 text-white p-2 rounded"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(user)}
                          className="bg-red-500 text-white p-2 rounded"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {isDeleting && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded-lg shadow-lg max-w-sm w-full text-center">
                <h3 className="text-xl">Are you sure you want to delete this user?</h3>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={confirmDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Yes, Delete
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="bg-gray-500 text-white px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserList;
