import React from 'react';
import { auth } from 'auth';

export default async function SettingsPage(): Promise<React.JSX.Element> {
  const session = await auth();
  return (
    <div>
      <h1>Settings page</h1>
      {JSON.stringify(session)}
    </div>
  );
}
