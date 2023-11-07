import { useState } from 'react';
import OnboardingForm from './Steps/OnboardingForm';
import OnboardingLink from './Steps/OnboardingLink';
import OnboardingEmail from './Steps/OnboardingEmail';
import OnboardingButton from './Steps/OnboardingButton';
import ResultsSplash from './Steps/ResultsSplash';

export default function OnboardingFlow() {
  /**
   * There are four steps during the onboarding flow.
   * 1) The user clicks a button to open the form.
   * 2) The user fills out a form.
   * 3) A unified link apapears.
   * 4) An email gets sent with the data, and a banner gets shown.
   */

  const OnboardingSteps = {
    Button: 'Button',
    Form: 'Form',
    Link: 'Link',
    Email: 'Email',
  };

  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(
    OnboardingSteps.Button
  );

  /**
   * The Plaid integration is determined by a few variables:
   *   plaidEnabled: Whether or not the user wants financial data.
   *   plaidNumConnections: The # of jobs to grab data for.
   *   plaidUserToken: The token associated with the generated data.
   */
  const [plaidEnabled, setPlaidEnabled] = useState(true);
  const [plaidNumConnections, setPlaidNumConnections] = useState(1);
  const [plaidUserToken, setPlaidUserToken] = useState(null);

  /**
   * The Covie integration is determined by a few variables:
   *   covieEnabled: Whether or not the user wants auto insurance data.
   *   coviePolicies: The insurance policy data generatd by the link.
   */
  const [covieEnabled, setCovieEnabled] = useState(true);
  const [coviePolicies, setCoviePolicies] = useState([]);

  // Define the four components needed for each step in the process.
  const FlowComponents = {
    Button: (
      <OnboardingButton
        onClick={() => setCurrentOnboardingStep(OnboardingSteps.Form)}
      />
    ),
    Form: (
      <OnboardingForm
        plaidEnabled={plaidEnabled}
        setPlaidEnabled={setPlaidEnabled}
        plaidNumConnections={plaidNumConnections}
        setPlaidNumConnections={setPlaidNumConnections}
        covieEnabled={covieEnabled}
        setCovieEnabled={setCovieEnabled}
        onClose={() => setCurrentOnboardingStep(OnboardingSteps.Button)}
        onSuccess={() => setCurrentOnboardingStep(OnboardingSteps.Link)}
      />
    ),
    Link: (
      <OnboardingLink
        plaidEnabled={plaidEnabled}
        plaidNumConnections={plaidNumConnections}
        plaidUserToken={plaidUserToken}
        setPlaidUserToken={setPlaidUserToken}
        covieEnabled={covieEnabled}
        setCovieEnabled={setCovieEnabled}
        setCoviePolicies={setCoviePolicies}
        onClose={() => setCurrentOnboardingStep(OnboardingSteps.Button)}
        onSuccess={() => setCurrentOnboardingStep(OnboardingSteps.Email)}
      />
    ),
    Email: (
      <OnboardingEmail
        plaidEnabled={plaidEnabled}
        plaidUserToken={plaidUserToken}
        covieEnabled={covieEnabled}
        coviePolicies={coviePolicies}
      />
    ),
  };

  return FlowComponents[currentOnboardingStep];
}
