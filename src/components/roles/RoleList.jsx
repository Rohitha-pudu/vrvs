import React, { useContext, useState } from 'react';
import { RBACContext } from '../../context/RBACContext';
import { FaTrash } from 'react-icons/fa'; // Icon for delete action

const RoleList = () => {
  const { roles, addRole, deleteRole } = useContext(RBACContext);
  const [isAddRoleFormVisible, setIsAddRoleFormVisible] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: [] });
  const [isOtherSelected, setIsOtherSelected] = useState(false); // State for "Other"
  const [customPermission, setCustomPermission] = useState('');

  const permissionOptions = ['Read', 'Write', 'Read and Write'];

  const handleAddRole = () => {
    if (newRole.name && (newRole.permissions.length || customPermission)) {
      const permissions = [...newRole.permissions];
      if (customPermission) {
        permissions.push(customPermission.trim());
      }
      addRole({ ...newRole, permissions });
      setNewRole({ name: '', permissions: [] });
      setCustomPermission('');
      setIsOtherSelected(false); // Reset "Other" state
      setIsAddRoleFormVisible(false);
    }
  };

  const handlePermissionChange = (permission) => {
    const updatedPermissions = newRole.permissions.includes(permission)
      ? newRole.permissions.filter((perm) => perm !== permission)
      : [...newRole.permissions, permission];
    setNewRole({ ...newRole, permissions: updatedPermissions });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 relative">
      {/* Add Role Button */}
      <div className="absolute top-0 right-4">
        <button
          onClick={() => setIsAddRoleFormVisible(true)}
          className="bg-green-500 text-white px-6 py-2 rounded-lg shadow hover:bg-green-600 transition-all"
        >
          Add Role
        </button>
      </div>
  
      {/* Roles Table */}
      <div className="overflow-x-auto mt-8"> {/* Add some margin to avoid overlap */}
        <table className="min-w-full table-auto bg-white shadow-lg rounded-lg">
          <thead className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
            <tr>
              <th className="border-b border-gray-200 p-4 text-left text-sm font-bold">Name</th>
              <th className="border-b border-gray-200 p-4 text-left text-sm font-bold">Permissions</th>
              <th className="border-b border-gray-200 p-4 text-left text-sm font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="hover:bg-gray-50 transition-all duration-300">
                <td className="border-b border-gray-200 p-4 text-sm text-gray-800">{role.name}</td>
                <td className="border-b border-gray-200 p-4 text-sm text-gray-800">
                  {role.permissions.join(', ')}
                </td>
                <td className="border-b border-gray-200 p-4 text-sm text-gray-800">
                  <button
                    onClick={() => deleteRole(role.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete Role"
                  >
                    <FaTrash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
      {/* Add Role Form */}
      {isAddRoleFormVisible && (
        <div className="mt-6 bg-white p-4 sm:p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Add New Role</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                type="text"
                id="name"
                value={newRole.name}
                onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <div className="mt-2 space-y-2">
                {permissionOptions.map((permission) => (
                  <div key={permission} className="flex items-center">
                    <input
                      type="checkbox"
                      id={permission}
                      checked={newRole.permissions.includes(permission)}
                      onChange={() => handlePermissionChange(permission)}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label
                      htmlFor={permission}
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      {permission}
                    </label>
                  </div>
                ))}
                <div className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    id="other"
                    checked={isOtherSelected}
                    onChange={() => setIsOtherSelected(!isOtherSelected)}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                  />
                  <label htmlFor="other" className="ml-2 text-sm font-medium text-gray-700">
                    Other
                  </label>
                </div>
                {isOtherSelected && (
                  <input
                    type="text"
                    value={customPermission}
                    onChange={(e) => setCustomPermission(e.target.value)}
                    placeholder="Enter custom permission"
                    className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsAddRoleFormVisible(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleAddRole}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
              >
                Add Role
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default RoleList;
