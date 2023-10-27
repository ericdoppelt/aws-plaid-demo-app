import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthenticator, Heading } from '@aws-amplify/ui-react';

export default function Layout() {
  const { route } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user
  ]);

  return (
    <>
      {route !== 'authenticated' && <div>
        <img className='caseswift-logo' src={process.env.PUBLIC_URL + '/assets/images/fullLogo.png'} alt="CaseSwift Logo" />
        <Heading level={2}>Login</Heading>
      </div>}

      <Outlet />
    </>
  );
}
