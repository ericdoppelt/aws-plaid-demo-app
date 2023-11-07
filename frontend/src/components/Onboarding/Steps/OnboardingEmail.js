import { useEffect, useState } from 'react';
import { API, Logger } from 'aws-amplify';
import { useAuthenticator } from '@aws-amplify/ui-react';
import EmailBanner from '../Components/EmailBanner';

const logger = new Logger('Plaid');
const apiName = 'plaidapi';

export default function EmailGenerator({
  plaidEnabled,
  plaidUserToken,
  covieEnabled,
  coviePolicies,
}) {
  // TODO: This should be set once on render, and then stored in state.
  const { user } = useAuthenticator((context) => [context.user]);
  const email = user.signInUserSession.idToken.payload.email;

  const [emailRequest, setEmailRequest] = useState(true);
  const [showBanner, setShowBanner] = useState(false);

  // When the form is submitted, open the link.
  useEffect(() => {
    if (emailRequest) {
      sendEmailRequest();
    }
  }, [emailRequest]);

  // Sends the POST request to generate the email.
  const sendEmailRequest = async () => {
    // Get the POST response and log it.
    var requestBody = {
      email: email,
    };
    if (plaidEnabled) {
      requestBody['plaid_user_token'] = plaidUserToken;
    }
    if (covieEnabled) {
      requestBody['covie_policies'] = coviePolicies;
    }

    try {
      const res = await API.post(apiName, '/v1/tokens/send-email', {
        body: requestBody,
      });
      logger.debug('POST /v1/tokens/send-email response:', res);
      // Set user ID and token values asynchronously.
    } catch (err) {
      logger.error('Unable to create link token:', err);
    }
    setEmailRequest(false);
    setShowBanner(true);
  };

  return showBanner ? <EmailBanner email={email} /> : <div />;
}
