import { useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';

export default function PlaidLink({ token, onSuccess, onClose }) {
  const { open, ready, error } = usePlaidLink({
    token,
    onSuccess,
    onClose,
  });

  useEffect(() => {
    if (token) {
      open();
    }
  }, [token, open]);

  return <div />;
}
