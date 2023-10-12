import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthenticator, Button, Heading, View } from '@aws-amplify/ui-react';

export default function Layout() {
  const { route, signOut, user } = useAuthenticator((context) => [
    context.route,
    context.signOut,
    context.user
  ]);
  const navigate = useNavigate();

  function logOut() {
    signOut();
    navigate('/login');
  }
  return (
    <>
      <img className='caseswift-logo' src={process.env.PUBLIC_URL + '/assets/images/fullLogo.png'} alt="CaseSwift Logo" />
      <View>
        {route === 'authenticated' ? `Welcome ${user.signInUserSession.idToken.payload.email}` : <Heading level={2}>Login</Heading>}
      </View>

      <Outlet />
    </>
  );
}
