import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { OnboardingStackParamList } from '../types';

// Import screens (will create these next)
import WelcomeScreen from '../screens/onboarding/WelcomeScreen';
import PersonalInfoScreen from '../screens/onboarding/PersonalInfoScreen';
import GoalsScreen from '../screens/onboarding/GoalsScreen';
import CompleteScreen from '../screens/onboarding/CompleteScreen';

const Stack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="PersonalInfo" component={PersonalInfoScreen} />
      <Stack.Screen name="Goals" component={GoalsScreen} />
      <Stack.Screen name="Complete" component={CompleteScreen} />
    </Stack.Navigator>
  );
};

export default OnboardingNavigator;
