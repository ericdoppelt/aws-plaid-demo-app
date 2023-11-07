import { useEffect } from 'react';
import { Logger } from 'aws-amplify';

//eslint-disable-next-line
const logger = new Logger('Plaid');

export default function Covie({ setCoviePolicies, onSuccess }) {
  // Establish the link button. This code was provided by Covie.
  useEffect(() => {
    const onLinkSuccess = (linkId, policies) => {
      setCoviePolicies(policies);
      onSuccess();
    };

    window.Covie.access.init({
      integrationKey: 'ik_tgvz5zp57bq5jrij',
      onSuccess: onLinkSuccess,
    });
  }, [setCoviePolicies, onSuccess]);

  return null;
}
