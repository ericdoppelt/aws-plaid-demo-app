import { useEffect } from 'react';
import { Logger } from 'aws-amplify';

const logger = new Logger('Plaid');

export default function Covie({ setCoviePolicies, onSuccess, onClose }) {

  // Establish the link button. This code was provided by Covie.
  useEffect(() => {
    window.Covie.access.init({
      integrationKey: 'ik_tgvz5zp57bq5jrij',
      onSuccess: onSuccess,
    });
  }, []);

  return null;
}
