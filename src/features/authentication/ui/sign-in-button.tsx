'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface SignInButtonProps {
  children: React.ReactNode;
}

export function SignInButton({ children }: SignInButtonProps): React.JSX.Element {
  const router = useRouter();
  const onClick = () => {
    router.push('/auth/sign-in')
  };
  return (
    <div onClick={onClick}>{children}</div>
  );
}
