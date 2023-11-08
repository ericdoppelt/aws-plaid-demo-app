import React, { useCallback, useEffect, useState } from 'react';
import { API, Logger } from 'aws-amplify';
import PlaidLink from '../Components/PlaidLink';

const logger = new Logger('Plaid');
const apiName = 'plaidapi';

export default function Plaid({
  plaidUserToken,
  setPlaidUserToken,
  plaidNumConnections,
  onSuccess,
}) {
  /**
   * The link needs to be rendered async.
   * This is because the user token must be set before showing anything.
   */
  const [showLink, setShowLink] = useState(false);

  // Maintain state to track necessary Plaid variables for network requests.
  const [clientUserId, setClientUserId] = useState(null);
  const [linkToken, setLinkToken] = useState(null);

  /**
   * State to trigger Plaid requests.
   * If a variable is set to true, it will trigger the request and set itself back to false.
   */
  const [userRequest, setUserRequest] = useState(true);
  const [linkRequest, setLinkRequest] = useState(false);
  const [numLinksLeft, setNumLinksLeft] = useState(plaidNumConnections);

  // Starts the Plaid connection: gets the user token and triggers the opening of a Plaid Link.
  const sendUserRequest = useCallback(async () => {
    // Create the user token.
    try {
      // Get the POST response and log it.
      const res = await API.get(apiName, '/v1/tokens/plaid-user');
      logger.debug('POST /v1/tokens/user response:', res);
      // Set user ID and token values asynchronously.
      setPlaidUserToken(res.user_token);
      setClientUserId(res.client_user_id);
    } catch (err) {
      logger.error('Unable to create link token:', err);
    }
    setUserRequest(false);
    setLinkRequest(true);
  }, [setPlaidUserToken, setClientUserId, setUserRequest, setLinkRequest]);

  // If the user request variable is true, generate a new token.
  useEffect(() => {
    if (userRequest) {
      sendUserRequest();
    }
  }, [userRequest, sendUserRequest]);

  // Opens a Plaid link.
  const sendLinkRequest = useCallback(async () => {
    try {
      const res = await API.post(apiName, '/v1/tokens/plaid-link', {
        body: {
          user_token: plaidUserToken,
          client_user_id: clientUserId,
        },
      });
      logger.debug('POST /v1/tokens/link-payroll response:', res);
      setLinkToken(res.link_token);
    } catch (err) {
      logger.error('Unable to create link token:', err);
    }
    setShowLink(true);
    setLinkRequest(false);
  }, [setLinkToken, setShowLink, setLinkRequest, plaidUserToken, clientUserId]);

  // If the link request variable is true, and the request params have been set, generate a new token.
  useEffect(() => {
    if (linkRequest && plaidUserToken && clientUserId) {
      sendLinkRequest();
    }
  }, [linkRequest, plaidUserToken, clientUserId, sendLinkRequest]);


  // Determines whether a new plaid link should be created or the Plaid process is done.
  const onLinkSuccess = async () => {
    if (numLinksLeft == 1) {
      onSuccess();
    } else {
      setNumLinksLeft(plaidNumConnections - 1);
      setLinkRequest(true);
    }
  };

  return showLink ? (
    <PlaidLink token={linkToken} onSuccess={onLinkSuccess} />
  ) : null;
}
