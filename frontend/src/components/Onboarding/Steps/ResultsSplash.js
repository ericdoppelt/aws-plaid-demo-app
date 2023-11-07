import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Typography } from '@mui/material';

/**
 * Form used to set up a new user. Dictates the type of data to pull.
 * @param {Function} onClick is a callback function that transitions the onboarding flow step.
 */
export default function ResultsSplash({
  onClose,
  onSuccess,
  title,
  type,
  image,
}) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        <b>Record Selection - {title}</b>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              paddingLeft: '1em',
              paddingTop: '5%',
              paddingBottom: '10%',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Typography
                sx={{
                  color: '#3b873e',
                  background: '#e8f5e9',
                  paddingLeft: '10px',
                  paddingRight: '10px',
                  borderRadius: '15px',
                }}
              >
                Success
              </Typography>
            </Box>
            <Typography variant='p'>
              We have retrieved your {type} Information.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <img
              src={process.env.PUBLIC_URL + `/assets/images/${image}`}
              alt='Paystub Success'
              style={{
                width: '55%',
                height: 'auto',
              }}
            />
            <Box sx={{ flexGrow: 1 }} />
          </Box>
          <Typography
            variant='p'
            sx={{
              paddingTop: '10%',
              paddingBottom: '10%',
              alignSelf: 'center',
            }}
          >
            Select &quot;Continue&quot; to retrieve additional records
          </Typography>
        </Box>
        <DialogActions>
          <Button
            variant='outlined'
            style={{ marginLeft: '8px', marginRight: 'auto', width: '172px' }}
            onClick={onClose}
          >
            Exit
          </Button>
          <Button
            variant='contained'
            onClick={onSuccess}
            style={{ width: '172px' }}
          >
            Continue
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
