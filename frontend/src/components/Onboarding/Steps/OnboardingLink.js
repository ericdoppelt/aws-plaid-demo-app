import * as React from 'react';
import { useEffect, useState } from 'react';

import Plaid from '../Integrations/Plaid';
import Covie from '../Integrations/Covie';

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
        onSuccess={() => setCurrentLinkStep(LinkSteps.Covie)}
      />
    ),
    Covie: (
      <Covie
        setCovieToggle={setCovieEnabled}
        setCoviePolicies={setCoviePolicies}
        onSuccess={onSuccess}
      />
    ),
  };

  return LinkComponents[currentLinkStep];
}
