import { useEffect } from 'react';
import { Logger } from 'aws-amplify';

const logger = new Logger('Plaid');

export default function Covie({ setCovieToggle, setCoviePolicies }) {

  const handleLinkSuccess = (linkId, policies) => {
    logger.info('a');
    setCoviePolicies(policies);
  };

  const handleClose = () => {
    logger.info('b');
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

  logger.log('c')
  return null;
}
