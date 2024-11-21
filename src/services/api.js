let rolesData = [
  {
    id: 1,
    roleName: "Admin",
    permissions: ["Read", "Write", "Delete"],
  },
  { id: 2, roleName: "User", permissions: ["Read"] },
];

let usersData = [
  {
    id: 1,
    username: "Varshith1",
    email: "varshith@gmail.com",
    role: "Admin",
    status: "active",
  },
  {
    id: 2,
    username: "Reddy2",
    email: "reddy@gmail.com",
    role: "User",
    status: "active",
  },
];

// Roles-related API functions
export const getRoles = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rolesData);
    }, 1000); // Simulating API response delay
  });
};

export const addRole = (newRole) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = { id: rolesData.length + 1, ...newRole, active: true }; // default to active
      rolesData.push(role);
      resolve(role);
    }, 1000);
  });
};

export const updateRole = (id, updatedRole) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const roleIndex = rolesData.findIndex((role) => role.id === id);
      if (roleIndex !== -1) {
        rolesData[roleIndex] = { id, ...updatedRole };
        resolve(rolesData[roleIndex]);
      }
    }, 1000);
  });
};

export const deleteRole = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      rolesData = rolesData.filter((role) => role.id !== id);
      resolve();
    }, 1000);
  });
};

// Users-related API functions
export const getUsers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(usersData);
    }, 1000); // Simulating API response delay
  });
};

export const addUser = (newUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = { id: usersData.length + 1, ...newUser, active: true }; // default to active
      usersData.push(user);
      resolve(user);
    }, 1000);
  });
};

export const updateUser = (id, updatedUser) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const userIndex = usersData.findIndex((user) => user.id === id);
      if (userIndex !== -1) {
        usersData[userIndex] = { id, ...updatedUser };
        resolve(usersData[userIndex]);
      }
    }, 1000);
  });
};

export const deleteUser = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      usersData = usersData.filter((user) => user.id !== id);
      resolve();
    }, 1000);
  });
};
