# **Role and User Management System**

## **Project Overview**

The **Role and User Management System** enables administrators to manage users and assign them specific roles with associated permissions. Users can be added, deleted, and their roles and permissions modified in real-time. This system offers a streamlined way to manage user access and roles within an application.

## **Features**

### **1. Role Management**
   - **Add Role**: You can create new roles with a name and assign permissions to each role (such as Read, Write, and Custom Permissions).
   - **Delete Role**: Roles can be deleted, and confirmation is required before deletion.
   - **View Permissions**: Each role has a list of associated permissions, which can be updated as needed.

### **2. User Management**
   - **Add User**: You can add a new user by providing their name, email, and assigning them one or more roles.
   - **Delete User**: Users can be deleted by clicking the delete button next to each user. A confirmation message will be shown before deletion.
   - **Assign Roles to Users**: Users can be assigned one or multiple roles. This allows granular control over what actions a user can perform within the application.
   - **View User Roles and Permissions**: The roles assigned to each user are displayed, along with their corresponding permissions. This helps administrators monitor and manage user access.

### **3. Permissions**
   - Permissions are available for each role and can be assigned to users as needed. These permissions include:
     - **Read**
     - **Write**
     - **Read and Write**
     - **Custom Permissions** (can be defined dynamically by the admin)

### **4. Success and Error Handling**
   - After adding or deleting a user or role, the system shows a success message.
   - Error messages appear if there are issues (such as missing required fields like name or email for users, or missing permissions for roles).
   - Messages auto-dismiss after a few seconds.

### **5. Real-time Updates**
   - **Role and User Lists**: Both the role and user lists are updated in real-time when actions are performed (like adding or deleting a user or role).
   - **Role and Permission Changes**: When a user's roles or permissions are updated, the changes immediately reflect in the interface.

---

## **Detailed Features Breakdown**

### **1. Add Role Form**
   - Users can enter a **role name** and select the appropriate **permissions** for that role.
   - Permissions are displayed as checkboxes, and users can add custom permissions if required.

### **2. Add User Form**
   - Admins can enter user details such as **name**, **email**, and assign one or more roles.
   - Roles can be selected using checkboxes, and the available roles are fetched dynamically from the role list.

### **3. Role and User List Table**
   - A **role list table** displays all roles with their associated permissions.
   - A **user list table** displays all users along with their names, emails, and assigned roles.
   - Both tables allow for **deletion** and **editing** of roles and users.
   
### **4. Modify User Roles and Permissions**
   - Admins can easily modify the roles of a user by selecting or deselecting checkboxes in the user role list.
   - Permissions for each role are displayed, allowing admins to modify them as needed.

### **5. Success/Failure Feedback**
   - **Success Messages**: After adding or deleting a role/user, a success message is displayed.
   - **Error Messages**: Error messages are shown when an invalid action is attempted, such as missing fields or invalid data. All messages auto-dismiss after a few seconds.

---

## **Technologies Used**

- **React**: For building user interfaces.
- **Context API**: For managing global state, particularly user and role data.
- **Tailwind CSS**: For styling and creating a responsive design.
- **React Icons**: For adding icons to buttons (e.g., edit, delete icons).
- **JavaScript (ES6+)**: Modern JavaScript features for a clean and efficient codebase.

---

## **Setup Instructions**

To set up the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/role-and-user-management-system.git
