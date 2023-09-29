import { useState, useEffect } from 'react';
import OnboardingForm from './OnboardingForm';
import OnboardingLink from './OnboardingLink';
import EmailGenerator from './EmailGenerator';
import FormGeneratorButton from './FormGeneratorButton';

export default function OnboardingFlow() {
  // State used to manipulate the form generation button.
  const [showButton, setShowButton] = useState(true);

  // State associated with form building.
  const [formOpen, setFormOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // State associated wtih link handling.
  const [linkOpen, setLinkOpen] = useState(false);
  const [linkFinished, setLinkFinished] = useState(false);

  // State associated with email sending.
  const [sendEmail, setSendEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // State shared between form building and read by link handling.
  const [plaidToggle, setPlaidToggle] = useState(true);
  const [plaidNumber, setPlaidNumber] = useState(1);
  const [covieToggle, setCovieToggle] = useState(true);

  // When the form is submitted, open the link.
  useEffect(() => {
    if (formSubmitted) {
      setLinkOpen(true);
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  // When the form is submitted, open the link.
  useEffect(() => {
    if (formSubmitted && linkFinished) {
      setSendEmail(true);
    }
  }, [formSubmitted, linkFinished]);

  // State needed to generate the Plaid email.
  const [plaidUserToken, setPlaidUserToken] = useState(null);
  const [plaidRequired, setPlaidRequired] = useState(false);

  // State needed to generate the Plaid email.
  const [coviePolicies, setCoviePolicies] = useState(false);
  const [covieRequired, setCovieRequired] = useState(false);

  if (showButton) {
    return <FormGeneratorButton setShowButton={setShowButton} setFormOpen={setFormOpen} />;
  } else if (formOpen) {
    return (
      <OnboardingForm
        plaidToggle={plaidToggle}
        setPlaidToggle={setPlaidToggle}
        plaidNumber={plaidNumber}
        setPlaidNumber={setPlaidNumber}
        setPlaidRequired={setPlaidRequired}
        covieToggle={covieToggle}
        setCovieToggle={setCovieToggle}
        setCovieRequired={setCovieRequired}
        setFormSubmitted={setFormSubmitted}
      />
    );
  } else if (linkOpen) {
    <OnboardingLink
      linkOpen={linkOpen}
      setLinkOpen={setLinkOpen}
      plaidToggle={plaidToggle}
      setPlaidToggle={setPlaidToggle}
      plaidNumber={plaidNumber}
      setPlaidNumber={setPlaidNumber}
      plaidUserToken={plaidUserToken}
      setPlaidUserToken={setPlaidUserToken}
      covieToggle={covieToggle}
      setCovieToggle={setCovieToggle}
      setCoviePolicies={setCoviePolicies}
      setLinkFinished={setLinkFinished}
    />;
  } else {
    return (
      <EmailGenerator
        plaidRequired={plaidRequired}
        plaidUserToken={plaidUserToken}
        covieRequired={covieRequired}
        coviePolicies={coviePolicies}
        sendEmail={sendEmail}
        setSendEmail={setSendEmail}
        emailSent={emailSent}
        setEmailSent={setEmailSent}
      />
    );
  }
}
