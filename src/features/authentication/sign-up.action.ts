'use server';

import { users } from '@/shared/api/users';

export const signUp = async (values: any) =>  {
  console.log(values);
  if (values?.email === '' && values?.password === '') {
    return { error: "Invalid email!" }
  }

  users.push({ email: values.email, password: values.password, roles: [{ role: '/dashboard/users' }]})
  return { success: "Authorized"}
}
