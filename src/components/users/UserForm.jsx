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
    status: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};

    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters long.';
    }

    
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required.';
    }

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      if (formData.id) {
        updateUser(formData.id, formData);
        toast.success('User updated successfully!');
      } else {
        addUser(formData);
        toast.success('User added successfully!');
      }
      onClose();
    } else {
      toast.error('Please fix the errors in the form.');
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-lg mx-auto">
      <h3 className="text-2xl font-semibold text-gray-800 mb-6">
        {formData.id ? 'Edit User' : 'Add User'}
      </h3>
      <form onSubmit={handleSubmit}>
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
            className={`w-full p-3 mt-2 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
        </div>

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
            className={`w-full p-3 mt-2 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.role && <p className="text-sm text-red-500 mt-1">{errors.role}</p>}
        </div>

        
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
            className={`w-full p-3 mt-2 border-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
        </div>

      
         

        
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
