import React, { useState, useContext } from 'react';
import { RBACContext } from '../../context/RBACContext';

const RoleForm = ({ onClose, initialData }) => {
  const { addRole, updateRole } = useContext(RBACContext);
  const [formData, setFormData] = useState(
    initialData || { id: '', name: '', permissions: [] }
  );
  const [newPermission, setNewPermission] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddPermission = () => {
    if (newPermission) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, newPermission],
      });
      setNewPermission('');
    }
  };

  const handleRemovePermission = (perm) => {
    setFormData({
      ...formData,
      permissions: formData.permissions.filter((p) => p !== perm),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateRole(formData.id, formData);
    } else {
      addRole({ ...formData, id: Date.now() });
    }
    onClose();
  };

  return (
    <div className="p-4 bg-gray-100 rounded shadow-md">
      <h3 className="text-lg font-bold mb-4">
        {formData.id ? 'Edit Role' : 'Add Role'}
      </h3>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Role Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </label>
        <label className="block mb-2">
          Add Permission:
          <div className="flex items-center">
            <input
              type="text"
              value={newPermission}
              onChange={(e) => setNewPermission(e.target.value)}
              className="w-full p-2 border rounded"
            />
            <button
              type="button"
              onClick={handleAddPermission}
              className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </label>
        <div className="mb-4">
          <h4 className="font-bold">Permissions:</h4>
          <ul>
            {formData.permissions.map((perm) => (
              <li key={perm} className="flex items-center">
                {perm}
                <button
                  type="button"
                  onClick={() => handleRemovePermission(perm)}
                  className="ml-2 text-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button
          type="button"
          onClick={onClose}
          className="ml-2 bg-gray-300 px-4 py-2 rounded"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default RoleForm;
