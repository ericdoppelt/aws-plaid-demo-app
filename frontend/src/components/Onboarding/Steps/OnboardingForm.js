import React from 'react';
import Button from '@mui/material/Button';
import { Checkbox } from '@mui/material';
import { FormControl, FormLabel, RadioGroup, Radio } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';

/**
 * Form used to set up a new user. Dictates the type of data to pull.
 * @param {Function} onClick is a callback function that transitions the onboarding flow step.
 */
export default function OnboardingForm({
  plaidEnabled,
  setPlaidEnabled,
  plaidNumConnections,
  setPlaidNumConnections,
  covieEnabled,
  setCovieEnabled,
  onClose,
  onSuccess,
}) {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>
        <b>Record Retrieval Request</b>
      </DialogTitle>
      <DialogContent>
        <FormGroup>
          <DialogContentText>Demographic Information</DialogContentText>
          <TextField
            id='outlined-helperText'
            label='Client First Name'
            style={{ marginTop: '16px', width: '50%' }}
          />
          <TextField
            id='outlined-helperText'
            label='Client Last Name'
            style={{ marginTop: '16px', width: '50%' }}
          />
          <TextField
            id='outlined-helperText'
            label='Client Email Address'
            style={{ marginTop: '16px', marginBottom: '30px', width: '50%' }}
          />
          <DialogContentText>Document Selection</DialogContentText>
          <FormControlLabel control={<Checkbox />} label='Health Records' />
          <FormControlLabel
            control={
              <Checkbox
                checked={plaidEnabled}
                onChange={(event) => setPlaidEnabled(event.target.checked)}
              />
            }
            label='Employment Data'
          />
          {/* Only render the # input if the toggle is checked for Plaid. */}
          {plaidEnabled ? (
            <FormControlLabel
              control={
                <TextField
                  id='outlined-required'
                  label='Number of Employments'
                  value={plaidNumConnections}
                  onChange={(event) =>
                    setPlaidNumConnections(event.target.value)
                  }
                  type='number'
                />
              }
            />
          ) : null}
          <FormControlLabel
            control={
              <Checkbox
                checked={covieEnabled}
                onChange={(event) => setCovieEnabled(event.target.checked)}
              />
            }
            label='Auto Insurance Policy'
          />
          <FormControlLabel
            control={<Checkbox />}
            style={{ marginBottom: '30px' }}
            label='Health Insurnace Policy'
          />
          <FormControl style={{ marginBottom: '40px' }}>
            <FormLabel id='demo-radio-buttons-group-label'>
              Sharing Preference
            </FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='openForm'
              name='radio-buttons-group'
            >
              <FormControlLabel
                value='link'
                control={<Radio />}
                label='Share via link'
              />
              <FormControlLabel
                value='openForm'
                control={<Radio />}
                label='Open form in browser'
              />
            </RadioGroup>
          </FormControl>
        </FormGroup>
        <DialogActions>
          <Button
            variant='outlined'
            style={{ marginLeft: '8px', marginRight: '160px', width: '21em' }}
            onClick={onClose}
          >
            Back
          </Button>
          <Button
            variant='contained'
            onClick={onSuccess}
            style={{ width: '21em' }}
          >
            Request Records
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
