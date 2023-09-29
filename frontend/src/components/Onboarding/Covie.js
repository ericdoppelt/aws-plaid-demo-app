import { useEffect, useState } from 'react';
import { API, Logger } from 'aws-amplify';

const logger = new Logger('Covie');
const apiName = 'plaidapi';

export default function Covie({ setCovieToggle, setCoviePolicies }) {

  const handleLinkSuccess = (linkId, policies) => {
    console.log('a')
    setCoviePolicies(policies);
  };

  const handleClose = () => {
    console.log('b')
    setCovieToggle(false);
  };

  // Establish the link button. This code was provided by Covie.
  useEffect(() => {
    window.Covie.access.init({
      integrationKey: 'ik_tgvz5zp57bq5jrij',
      onSuccess: handleLinkSuccess,
      onClose: handleClose
    });
  }, []);

  console.log('c')
  return null;
}
