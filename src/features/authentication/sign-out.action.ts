'use server';

import { signOut as signOutUser } from 'auth';

export const signOut = async () => {
  await signOutUser();
};