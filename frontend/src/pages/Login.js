import { Authenticator } from '@aws-amplify/ui-react';
import { useAuthenticator, View } from '@aws-amplify/ui-react';
import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Login.css';

export default function Login() {
  const { route } = useAuthenticator((context) => [context.route]);
  const location = useLocation();
  const navigate = useNavigate();
  let from = location.state?.from?.pathname || '/';

  const components = {
    SignUp: {
      Footer() {
        return (
          <View textAlign='center'>
            <strong>Password Policy</strong>:
            <ul>
              <li>Minimum of 8 characters</li>
              <li>At least one lowercase character</li>
              <li>At least one uppercase character</li>
              <li>At least one number character</li>
              <li>At least one symbol character</li>
            </ul>
          </View>
        );
      },
    },
  };

  useEffect(() => {
    if (route === 'authenticated') {
      navigate(from, { replace: true });
    }

    // ---- Change Amplify's Built-In Functionality ----
    //
    // Change Email component's Help text
    const injectedEmailInput = document.querySelector('input[name="username"]');
    if (injectedEmailInput) {
      injectedEmailInput.placeholder = 'Email Address';

      // Check if hint text is already added
      if (
        !injectedEmailInput.nextElementSibling ||
        injectedEmailInput.nextElementSibling.textContent !==
          'Enter your email address'
      ) {
        // Add Hint Below Email Input
        const hintText = document.createElement('p');
        hintText.classList.add('hint-text');
        hintText.textContent = 'We never share your email with anyone else.';

        // Find the parent of injectedEmailInput and insert hintText after it
        const parent = injectedEmailInput.parentElement;
        if (parent) {
          parent.appendChild(hintText);
        }
      }
    }
  }, [route, navigate, from]);

  return (
    <View className='auth-wrapper'>
      <Authenticator components={components} />
    </View>
  );
}
