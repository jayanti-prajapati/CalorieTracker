import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types';
import { useAuthStore } from '../stores/authStore';
import { Button, Typography, Input, Card } from '../../../components/ui';
import { tokens } from '../../../theme/tokens';

type SignInScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'SignIn'
>;

const SignInScreen: React.FC = () => {
  const navigation = useNavigation<SignInScreenNavigationProp>();
  const { login, isLoading } = useAuthStore();

  const handleGoogleSignIn = async () => {
    try {
      // Mock Google Sign-In for now
      // Alert.alert('Google Sign-In', 'Google Sign-In integration coming soon!');
      // For demo purposes, simulate successful login with username
      await login('demo_user', 'password');
    } catch (error) {
      Alert.alert('Sign In Failed', 'Google Sign-In failed. Please try again.');
    }
  };

  const handleBackToLanding = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={tokens.colors.neutral.white}
      />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={handleBackToLanding}
        >
          <Typography variant="h4" color="gray900">
            ←
          </Typography>
        </TouchableOpacity>
        <Typography variant="h5" weight="semibold" color="gray900">
          Sign In
        </Typography>
        <View style={styles.placeholder} />
      </View>
      {/* Content */}
      <View style={styles.content}>
        <View style={styles.welcomeSection}>
          <Typography
            variant="h2"
            weight="bold"
            color="gray900"
            style={styles.welcomeTitle}
          >
            Welcome back!
          </Typography>
          <Typography
            variant="body1"
            color="gray600"
            align="center"
            style={styles.welcomeSubtitle}
          >
            Sign in to continue tracking your nutrition journey
          </Typography>
        </View>

        {/* Google Sign In Button */}
        <View style={styles.authSection}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <Typography variant="h4" weight="bold" style={styles.googleIcon}>
              G
            </Typography>
            <Typography variant="body1" weight="semibold" color="white">
              {isLoading ? 'Signing In...' : 'Continue with Google'}
            </Typography>
          </TouchableOpacity>

          <Typography
            variant="body2"
            color="gray500"
            align="center"
            style={styles.privacyText}
          >
            By continuing, you agree to our Terms of Service and Privacy Policy
          </Typography>
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Typography variant="body2" color="gray400" align="center">
          Secure authentication powered by Google
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: tokens.spacing[6],
    paddingTop: tokens.spacing[5],
    paddingBottom: tokens.spacing[5],
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: tokens.borderRadius.full,
    backgroundColor: tokens.colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    ...tokens.shadows.sm,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: tokens.spacing[6],
  },
  welcomeSection: {
    alignItems: 'center',
    marginBottom: tokens.spacing[12],
  },
  welcomeTitle: {
    marginBottom: tokens.spacing[3],
  },
  welcomeSubtitle: {
    lineHeight:
      tokens.typography.fontSize.base * tokens.typography.lineHeight.normal,
    paddingHorizontal: tokens.spacing[4],
  },
  authSection: {
    alignItems: 'center',
    paddingHorizontal: tokens.spacing[6],
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: tokens.colors.brand.primary,
    paddingVertical: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[8],
    borderRadius: tokens.borderRadius.lg,
    marginBottom: tokens.spacing[6],
    minHeight: 56,
    ...tokens.shadows.lg,
  },
  googleIcon: {
    marginRight: tokens.spacing[3],
    backgroundColor: tokens.colors.neutral.white,
    color: '#4285F4',
    width: 32,
    height: 32,
    borderRadius: tokens.borderRadius.full,
    textAlign: 'center',
    lineHeight: 32,
  },
  privacyText: {
    marginTop: tokens.spacing[4],
    paddingHorizontal: tokens.spacing[4],
    lineHeight:
      tokens.typography.fontSize.sm * tokens.typography.lineHeight.relaxed,
  },
  bottomSection: {
    paddingHorizontal: tokens.spacing[6],
    paddingVertical: tokens.spacing[6],
    alignItems: 'center',
  },
});

export default SignInScreen;
