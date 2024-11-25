import React, { createContext, useState } from 'react';

export const RBACContext = createContext();

export const RBACProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1,imageUrl:'https://i.pinimg.com/474x/4e/22/be/4e22beef6d94640c45a1b15f4a158b23.jpg', name: 'John Doe', role: 'Admin', status: 'Active', email: 'john.doe@example.com', lastActivity: '5 days back' },
    { id: 2,imageUrl:'https://i.pinimg.com/474x/30/e5/84/30e584ea1ce703862fd037e403a11181.jpg', name: 'Jane Smith', role: 'Editor', status: 'Active', email: 'jane.smith@example.com', lastActivity: '15 days back' },
    { id: 3,imageUrl:'https://i.pinimg.com/736x/00/a8/b1/00a8b13df1da6baa85942271d36ef88c.jpg', name: 'Riya Ali', role: 'Admin', status: 'Inactive', email: 'riya.doe@example.com', lastActivity: '7 days back' },
    { id: 4,imageUrl:'https://i.pinimg.com/474x/ad/c7/97/adc797baa7d503886118b76b18415b9c.jpg', name: 'Jack Smith', role: 'Editor', status: 'Inactive', email: 'jakee.smith@example.com', lastActivity:'3 days back' },
    { id: 5,imageUrl:'https://i.pinimg.com/474x/c2/10/2a/c2102a8c7768a31e3de0ceb903ea8216.jpg', name: 'Aurora', role: 'Admin', status: 'Active', email: 'aurora13@example.com', lastActivity:'1 days back' }
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
