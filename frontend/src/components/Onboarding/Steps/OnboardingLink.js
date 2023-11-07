import * as React from 'react';
import { useEffect, useState } from 'react';

import Plaid from '../Integrations/Plaid';
import Covie from '../Integrations/Covie';
import ResultsSplash from './ResultsSplash';

export default function OnboardingLink({
  plaidEnabled,
  plaidNumConnections,
  plaidUserToken,
  setPlaidUserToken,
  covieEnabled,
  setCovieEnabled,
  setCoviePolicies,
  onClose,
  onSuccess,
}) {
  /**
   * There are two steps during the link flow.
   * 1) The Plaid link appears.
   * 2) The Covie link appears.
   */

  const LinkSteps = {
    Plaid: 'Plaid',
    Covie: 'Covie',
    results: {
      Paystub: 'PaystubResults',
      Health: 'HealthResults',
    }
  };

  const [currentLinkStep, setCurrentLinkStep] = useState(null);

  // When the component renders, determine what link step to render.
  useEffect(() => {
    if (plaidEnabled) {
      setCurrentLinkStep(LinkSteps.Plaid);
    } else if (covieEnabled) {
      setCurrentLinkStep(LinkSteps.Covie);
    } else {
      onClose();
    }
  }, [LinkSteps.Covie, LinkSteps.Plaid, covieEnabled, onClose, plaidEnabled]);

  const LinkComponents = {
    Plaid: (
      <Plaid
        plaidUserToken={plaidUserToken}
        setPlaidUserToken={setPlaidUserToken}
        plaidNumConnections={plaidNumConnections}
        onClose={onClose}
        onSuccess={() => setCurrentLinkStep(LinkSteps.results.Paystub)}
      />
    ),
    Covie: (
      <Covie
        setCovieToggle={setCovieEnabled}
        setCoviePolicies={setCoviePolicies}
        onSuccess={LinkSteps.results.Health}
      />
    ),
    PaystubResults: (<ResultsSplash onSuccess={() => {
      setCurrentLinkStep(LinkSteps.Covie)
    }}
      onClose={onClose}
      title='Paystubs'
      type='Employment'
      image='RocketHands.webp' />
    ),
    HealthResults: (<ResultsSplash onSuccess={() => {
      setCurrentLinkStep(onSuccess)
    }}
      onClose={onClose}
      title='Health Records'
      type='Health Record'
      image='Popper.webp' />
    ),
  };

  return LinkComponents[currentLinkStep];
}
