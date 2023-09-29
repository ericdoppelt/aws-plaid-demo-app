import * as React from 'react';
import { useState } from 'react';

import Plaid from './Plaid';
import Covie from './Covie';

export default function OnboardingLink({
  linkOpen,
  setLinkOpen,
  plaidToggle,
  setPlaidToggle,
  plaidNumber,
  setPlaidNumber,
  plaidUserToken,
  setPlaidUserToken,
  covieToggle,
  setCovieToggle,
  setCoviePolicies,
  setLinkSubmitted
}) {
  if (!linkOpen) {
    return null;
  } else if (plaidToggle) {
    return (
      <Plaid
        plaidUserToken={plaidUserToken}
        setPlaidUserToken={setPlaidUserToken}
        setPlaidToggle={setPlaidToggle}
        plaidNumber={plaidNumber}
        setPlaidNumber={setPlaidNumber}
      />
    );
  } else if (covieToggle) {
    return <Covie setCovieToggle={setCovieToggle} setCoviePolicies={setCoviePolicies} />;
  } else {
    setLinkOpen(false);
    setLinkSubmitted(true);
  }
}
