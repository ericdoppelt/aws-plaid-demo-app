import * as React from 'react';
import HouseOutlinedIcon from '@mui/icons-material/HouseOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {
  Avatar,
  Box,
  Drawer,
  CssBaseline,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import OnboardingFlow from '../OnboardingFlow';

const drawerWidth = 280;
const user = {
  avatar: process.env.PUBLIC_URL + '/assets/images/avatar.png',
  name: 'Michael Smith',
  email: 'michaelsmith12@gmail.com',
};

export default function MenuDrawer(data) {
  const logOut = data.props;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '20px',
      }}
    >
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        variant='permanent'
        anchor='left'
      >
        <List>
          <ListItem>
            <img
              src={process.env.PUBLIC_URL + '/assets/images/fullLogo.png'}
              alt='CaseSwift Logo'
              sx={{
                paddingLeft: '20px',
                width: '90%',
                marginLeft: '20px',
              }}
            />
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <HouseOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Client Dashboard' />
            </ListItemButton>
          </ListItem>
        </List>
        <div style={{ flexGrow: 1 }}></div>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Settings' />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => {
                logOut();
              }}
            >
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary='Logout' />
            </ListItemButton>
          </ListItem>
        </List>

        <List>
          <ListItem>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar src={user.avatar} />
              <Box sx={{ marginLeft: '20px' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#324054',
                  }}
                  component='p'
                >
                  {user.name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: '12px',
                    lineHeight: '16px',
                    color: '#71839B',
                  }}
                  component='p'
                >
                  {user.email}
                </Typography>
              </Box>
            </Box>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
