import MenuDrawer from '../components/Onboarding/Components/MenuDrawer';
import { useNavigate } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Box } from '@mui/material';
import { TextField, Typography } from '@mui/material';
import OnboardingFlow from '../components/Onboarding/OnboardingFlow';

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
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      paddingLeft: '20px'
    }}>
      <MenuDrawer props={logOut} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
        {/* Main Content */}
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <Typography 
          sx={{
            marginLeft:'260px',
            marginRight: '10%', 
            fontSize: '28px',
            fontWeight: 700,
            }} 
            variant='h5'>Client Table</Typography>
          <OnboardingFlow />
        </Box>
      </Box>
    </Box>
  );
}
