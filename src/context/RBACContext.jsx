import React, { createContext, useState } from 'react';

export const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', role: 'Admin', status: 'Invite Pending', email: 'john.doe@example.com', lastActivity: '5 days back' },
    { id: 2, name: 'Jane Smith', role: 'Editor', status: 'Invite Pending', email: 'jane.smith@example.com', lastActivity: '15 days back' },
    { id: 3, name: 'Riya Ali', role: 'Admin', status: 'Invite Accepted', email: 'riya.doe@example.com', lastActivity: '7 days back' },
    { id: 4, name: 'Jack Smith', role: 'Editor', status: 'Invite Expired', email: 'jakee.smith@example.com', lastActivity:'3 days back' },
    { id: 5, name: 'Aurora', role: 'Admin', status: 'Invite Pending', email: 'aurora13@example.com', lastActivity:'1 days back' }
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', permissions: ['Read', 'Write', 'Delete'] },
    { id: 2, name: 'Editor', permissions: ['Read', 'Write'] },
  ]);

  const addUser = (user) => setUsers([...users, user]);
  const updateUser = (id, updatedUser) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, ...updatedUser } 
          : user
      )
    );
  };
  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const addRole = (role) => setRoles([...roles, role]);
  const deleteRole = (id) => setRoles(roles.filter((role) => role.id !== id));

  return (
    <RBACContext.Provider
      value={{
        users,
        roles,
        addUser,
        deleteUser,
        updateUser,
        addRole,
        deleteRole
      }}
    >
      {children}
    </RBACContext.Provider>
  );
};
