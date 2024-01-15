"use client";

import React from 'react';
import { Button } from '@/shared/ui/button';
import { signOut } from '@/features/authentication/sign-out.action'

export default function DashboardPage(): React.JSX.Element {
  const onClick = () => {
    signOut();
  };
  return (
    <Button onClick={onClick}>Sign Out</Button>
  );
}
