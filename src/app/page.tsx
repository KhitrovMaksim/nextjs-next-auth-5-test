import React from 'react';
import { Button } from '@/shared/ui/button';
import { SignInButton } from '@/features/authentication/ui/sign-in-button';

export default function HomePage(): React.JSX.Element {
  return (
    <div>
      <h1>Home page</h1>
      <SignInButton>
        <Button variant="default">Sign In</Button>
      </SignInButton>
    </div>
  );
}
