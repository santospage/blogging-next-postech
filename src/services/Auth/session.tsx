// src/services/Auth/session.tsx
'use client';
import { authService } from '@/services/Auth/authService';
import React from 'react';
import { useRouter } from 'next/navigation';

/*
export function withSession(functionSession: any) {
  return async (context: any) => {
    try {
      const session = await authService.getSession(context);
      return functionSession({
        ...context,
        session,
      });
    } catch (error) {
      return {
        redirect: {
          destination: '/?error=unauthorized',
          permanent: false,
        },
      };
    }
  };
}
*/

export function useSession() {
  const [session, setSession] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<any>(null);

  React.useEffect(() => {
    authService
      .getSession()
      .then((userSession) => {
        setSession(userSession);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { loading, error, data: session };
}
/*
export function withSessionHOC<T>(Component: React.ComponentType<T>) {
  return function Wrapper(props: T) {
    const router = useRouter();
    const { loading, error, data: session } = useSession();

    React.useEffect(() => {
      if (!loading && error) {
        router.push('/?error=unauthorized');
      }
    }, [loading, error, router]);

    if (loading) {
      return <div>Loading...</div>; // Indicador de carregamento
    }

    const modifiedProps = { ...props, session };

    return <Component {...modifiedProps} />;
  };
}
*/
