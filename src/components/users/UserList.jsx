import React, { useContext, useState } from 'react';
import { RBACContext } from '../../context/RBACContext';
import { formatDistanceToNow } from 'date-fns';
import { FaClock, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';

const UserList = () => {
  const { users, deleteUser, updateUser } = useContext(RBACContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);

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
              {users.map((user) => {
                const lastActivity = new Date(user.lastActivity);
                const timeAgo = !isNaN(lastActivity.getTime())
                  ? formatDistanceToNow(lastActivity)
                  : 'N/A';

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-gradient-to-r from-blue-50 to-green-50 transition-all duration-300"
                  >
                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-800">
                      {user.name}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-800">
                      {user.role}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-800">
                      {user.email}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-800">
                      {user.status}
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 text-sm text-gray-800">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-gray-500 text-xs" />
                        <span className="text-gray-500 text-xs">{timeAgo} ago</span>
                      </div>
                    </td>
                    <td className="border-b border-gray-300 px-4 py-2 flex gap-4 items-center justify-end">
                      <button
                        className="text-yellow-600 hover:text-yellow-700 transition-colors"
                        onClick={() => handleEditClick(user)}
                        title="Edit User"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-700 transition-colors"
                        onClick={() => handleDeleteClick(user)}
                        title="Delete User"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {isDeleting && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-11/12 max-w-md">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Are you sure?</h3>
              <button onClick={cancelDelete}>
                <FaTimes size={18} className="text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Do you really want to delete the user {userToDelete?.name}?
            </p>
            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={cancelDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;
