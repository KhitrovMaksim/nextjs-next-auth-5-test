export type Role = {
  role: string
}

export type User = {
  email: string;
  password: string;
  roles: Role[];
}

export const users: User[] = [
  { email: 'max@max.max', password: '1234', roles: [ { role: '/dashboard/settings' }, { role: '/dashboard' }]}
  // { email: 'max@max.max', password: '1234', roles: [ { role: '/dashboard/users' }, { role: '/dashboard' }]}
];

export function getUserByEmail(email: string) {
  return users.find((user) => user.email === email)
}