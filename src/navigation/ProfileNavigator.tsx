import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProfileStackParamList } from '../features/meal/types';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PersonalDetailsScreen from '../screens/profile/PersonalDetailsScreen';
import LanguageScreen from '../screens/profile/LanguageScreen';
import PreferencesScreen from '../screens/profile/PreferencesScreen';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="ProfileMain" component={ProfileScreen} />
      <Stack.Screen name="PersonalDetails" component={PersonalDetailsScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
