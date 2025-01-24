import { Button } from '@/components/ui/button';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';
import React from 'react';

export default function Profile() {
  const { logout } = useSupabaseAuth();

  return (
    <main className='flex flex-col items-center justify-center h-full px-4 grow'>
      <div>Profile</div>
      <Button onClick={logout}>Sign-out</Button>
    </main>
  );
}
