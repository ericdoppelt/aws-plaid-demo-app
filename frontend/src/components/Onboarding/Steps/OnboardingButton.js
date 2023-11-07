import Button from '@mui/material/Button';

/**
 * Button used to open an OnboardingForm.
 * @param {Function} onClick is a callback function that transitions the onboarding flow step.
 */
export default function OnboardingButton({ onClick }) {
  return (
    <Button variant='outlined' onClick={onClick}>
      Generate Onboarding Form
    </Button>
  );
}
