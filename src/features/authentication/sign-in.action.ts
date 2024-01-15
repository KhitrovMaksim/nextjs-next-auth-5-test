'use server';

import { AuthError } from "next-auth";
import { signIn as signInUser } from 'auth';
import { DEFAULT_USER_AUTHENTICATED_REDIRECT } from 'configuration';

export const signIn = async (values: any) =>  {
  if (values?.email !== 'max@max.max') {
    return { error: "Invalid email!" }
  }

  const { email, password } = values;

  try {
    await signInUser("credentials", {
      email,
      password,
      redirectTo: DEFAULT_USER_AUTHENTICATED_REDIRECT
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Доступ запрещен." }
        default:
          return { error: "Ошибка авторизации." }
      }
    }

    throw error;
  }
}
