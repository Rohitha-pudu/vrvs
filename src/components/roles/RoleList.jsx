import React, { useContext, useState } from 'react';
import { RBACContext } from '../../context/RBACContext';
import { FaTrash } from 'react-icons/fa'; // Icon for delete action

const RoleList = () => {
  const { roles, addRole, deleteRole } = useContext(RBACContext);
  const [isAddRoleFormVisible, setIsAddRoleFormVisible] = useState(false);
  const [newRole, setNewRole] = useState({ name: '', permissions: '' });

  const handleAddRole = () => {
    if (newRole.name && newRole.permissions) {
      const permissionsArray = newRole.permissions.split(',').map((perm) => perm.trim());
      addRole({ ...newRole, permissions: permissionsArray });
      setNewRole({ name: '', permissions: '' });
      setIsAddRoleFormVisible(false);
    }
  };

  return (
    <div className="p-6">
      

      {/* Roles Table */}
      <table className="w-full table-auto mt-6 bg-white shadow-lg rounded-lg overflow-hidden">
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
  );
};

export default RoleList;
