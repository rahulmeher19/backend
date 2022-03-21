const allRoles = {
  user: ['createUser'],
  admin: ['getAllUser'],
  role: [],
  node: [],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
