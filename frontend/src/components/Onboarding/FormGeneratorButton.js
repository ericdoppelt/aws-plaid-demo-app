import Button from '@mui/material/Button';

export default function FormGeneratorButton({ setShowButton, setFormOpen }) {

  const handleFormGeneration = () => {
    setShowButton(false);
    setFormOpen(true);
  };

  return (
    <Button variant="outlined" onClick={handleFormGeneration}>
      Generate Onboarding Form
    </Button>
  );
}
