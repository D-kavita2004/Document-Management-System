const initialPermissionsList = [
  // Profile
  {
    permissionName: "can_delete_profile",
    description: "Allows deletion of a user profile",
  },
  {
    permissionName: "can_add_profile",
    description: "Allows creation of a new user profile",
  },
  {
    permissionName: "can_update_profile",
    description: "Allows updating an existing user profile",
  },
  {
    permissionName: "can_get_all_profiles",
    description: "Allows viewing all user profiles",
  },

 // Roles
  {
    permissionName: "can_get_all_roles",
    description: "Allows viewing all available roles",
  },
  {
    permissionName: "can_add_new_role",
    description: "Allows creation of a new role",
  },
  {
    permissionName: "can_delete_role",
    description: "Allows deletion of an existing role",
  },
  {
    permissionName: "can_update_role",
    description: "Allows updating an existing role",
  },

  // // Profile Attributes
  {
    permissionName: "can_get_profile_attributes",
    description: "Allows viewing profile attributes",
  },
  {
    permissionName: "can_update_profile_permission",
    description: "Allows updating permissions for a profile",
  },

  // User
  {
    permissionName: "can_get_all_users",
    description: "Allows viewing all users in the system",
  },
  {
    permissionName: "can_change_roles",
    description: "Allows changing roles of users",
  },
  {
    permissionName: "can_update_role_permissions",
    description: "Allows updating the permissions assigned to user"
  },
  {
    permissionName: "can_get_role_permissions",
    description: "Allows seeing the permissions assigned to the user"
  },
  {
    permissionName: "can_insert_permissions",
    description: "Allows inserting new permissions to the user"
  },
];

export default initialPermissionsList;