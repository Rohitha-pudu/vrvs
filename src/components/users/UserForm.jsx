import React, { useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RBACContext } from '../../context/RBACContext';

const UserForm = ({ onClose, initialData }) => {
  const { addUser, updateUser } = useContext(RBACContext);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    role: '',
    email: '',
    status: 'Active'
  });

  // Set initial data for editing if available
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Prefill form data if editing
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.role || !formData.email) {
      alert('Please fill in all the fields');
      return;
    }

    // Check if we are updating or adding
    if (formData.id) {
      updateUser(formData.id, formData); // Update user if ID is available
      toast.success('User updated successfully!'); // Toast notification for update
    } else {
      addUser(formData); // Add new user if no ID is present
      toast.success('User added successfully!'); // Toast notification for add
    }
    onClose(); // Close form after submission
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {formData.id ? 'Edit User' : 'Add User'}
      </h3>
      <form onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Role Input */}
        <div className="mb-4">
          <label htmlFor="role" className="block text-sm font-medium text-gray-600">
            Role
          </label>
          <input
            id="role"
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-400 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Email Input */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Status Select */}
        <div className="mb-6">
          <label htmlFor="status" className="block text-sm font-medium text-gray-600">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 mt-2 border-2 border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
