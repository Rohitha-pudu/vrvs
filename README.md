# Role Management System

## Project Overview

The Role Management System allows you to manage user roles and permissions. You can add new roles, assign permissions, and delete roles as needed. This system provides a clear way to organize and control access within an application. The main features include adding roles, assigning predefined or custom permissions, and real-time updates to the role list.

## Features

### 1. **Role Management**
   - **Add Role**: You can create a new role by clicking the "Add Role" button. You will need to provide a role name and assign one or more permissions (either from predefined options or custom permissions).
   - **Delete Role**: Roles can be deleted by clicking the "Delete" button next to each role. A confirmation will appear before the role is deleted from the list.
   - **View Permissions**: Each role has an associated list of permissions displayed in the "Permissions" column. You can see the permissions assigned to each role and modify them if needed.

### 2. **Permissions**
   Permissions are displayed as checkboxes and can be assigned to roles. The permissions available are:
   - **Read**
   - **Write**
   - **Read and Write**
   - **Custom Permissions**: You can add any custom permissions by providing the name of the permission in a text input.

### 3. **Success and Error Handling**
   - After successfully adding or deleting a role, a success message appears to confirm the action.
   - If an error occurs (such as attempting to add a role without a name or permissions), an error message will appear for the user.

### 4. **Real-time Updates**
   - The role list is updated in real-time. When a new role is added, it immediately appears on the list.
   - If a role is deleted, the table is refreshed, and the deleted role is no longer visible.

## Project Features

### 1. **Add Role Form**
   - A dynamic form to add new roles to the system.
   - Users can enter a role name and select the appropriate permissions.
   - The form supports adding multiple permissions to a single role.
   - Custom permissions can be added if necessary.

### 2. **Permissions Management**
   - The role management table displays a list of permissions for each role.
   - Users can easily modify permissions for any role by selecting or deselecting checkboxes.
   - Custom permissions allow flexibility in defining new permissions for roles.

### 3. **Role List Table**
   - A table that lists all roles and their associated permissions.
   - Roles can be deleted by clicking the trash icon next to the role.
   - Each role's permissions are displayed next to its name.

### 4. **Success/Failure Feedback**
   - Success messages are shown after successful role addition or deletion.
   - Error messages are displayed for invalid actions (e.g., missing role name or permissions).
   - All messages auto-dismiss after a few seconds.

## Technologies Used

This project utilizes the following technologies:
- **React**: JavaScript library for building user interfaces.
- **Context API**: A simple way to manage state in React without using complex state management libraries.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **React Icons**: A library for including icons in the user interface, used here for role actions (e.g., delete icon).
- **JavaScript (ES6+)**: Modern JavaScript features like arrow functions, template literals, destructuring, etc.

## Setup Instructions

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/role-management-system.git
