'use client';
import { tokenService } from '@/services/Auth/tokenService';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function LogoutPage() {
  const router = useRouter();

  React.useEffect(() => {
    try {
      tokenService.delete();
      router.push('/');
    } catch (error) {
      alert(error);
    }
  }, [router]);

  return <div>Logging out...</div>;
}
