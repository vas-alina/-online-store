export const transformUser = (dbUser) => ({
  id: dbUser.id,
  login: dbUser.login,
  password: dbUser.password,
  registeredAt: dbUser.registed_at,
  roleId: dbUser.role_id,
  contactDetais: dbUser.contact_detais,
  lastName: dbUser.last_name,
  phone: dbUser.phone,
  email: dbUser.email,
});
