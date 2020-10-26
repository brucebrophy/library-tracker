const roles = ['user', 'admin'];

const roleRights = new Map();
roleRights.set(roles[0], ['getBooks', 'manageBooks']);
roleRights.set(roles[1], ['getUsers', 'manageUsers', 'getBooks', 'manageBooks']);

module.exports = {
  roles,
  roleRights,
};
