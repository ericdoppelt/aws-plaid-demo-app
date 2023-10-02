import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
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
      <DialogTitle>Generate Claimant Form!</DialogTitle>
      <DialogContent>
        <DialogContentText>Please note the information that you would like to pull for the claimant.</DialogContentText>
        <FormGroup>
          <FormControlLabel control={<Switch checked={false} disabled />} label="Health Data" />
          <FormControlLabel
            control={<Switch checked={plaidEnabled} onChange={(event) => setPlaidEnabled(event.target.checked)} />}
            label="Employment Data"
          />
          {/* Only render the # input if the toggle is checked for Plaid. */}
          {plaidEnabled ? (
            <FormControlLabel
              control={
                <TextField
                  id="outlined-required"
                  label="Number of Employments"
                  value={plaidNumConnections}
                  onChange={(event) => setPlaidNumConnections(event.target.value)}
                  type="number"
                />
              }
            />
          ) : null}
          <FormControlLabel
            control={<Switch checked={covieEnabled} onChange={(event) => setCovieEnabled(event.target.checked)} />}
            label="Auto Insurance Data"
          />
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="error" onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={onSuccess}>Generate</Button>
      </DialogActions>
    </Dialog>
  );
}
