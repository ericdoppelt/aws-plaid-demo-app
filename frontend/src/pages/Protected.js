import MenuDrawer from '../components/Onboarding/Components/MenuDrawer';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@mui/material';

export default function Protected() {
  const { signOut } = useAuthenticator((context) => [
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
    <Box>
      <MenuDrawer props={logOut} />
    </Box>
  );
}
