import { Flex } from '@aws-amplify/ui-react';
import OnboardingFlow from '../components/Onboarding/OnboardingFlow';

export default function Protected() {

  return (
    <Flex direction="column">
      <OnboardingFlow/>
    </Flex>
  );
}
