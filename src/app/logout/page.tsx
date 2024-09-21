'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { tokenService } from '@/services/Auth/tokenService';

export default function LogoutPage() {
  const router = useRouter();
  const hasLoggedOut = useRef(false);

  useEffect(() => {
    const logout = async () => {
      if (hasLoggedOut.current) return;

      hasLoggedOut.current = true;
      try {
        await tokenService.delete();
        sessionStorage.removeItem('userSession');
        toast.info('You are being logged out...');
        router.push('/');
      } catch (error) {
        toast.error(`Logout failed: ${(error as Error).message}`);
      }
    };

    logout();
  }, [router]);

  return null;
}
