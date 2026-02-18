import React from 'react';
import { View, StyleSheet, SafeAreaView, StatusBar, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../types';
import { Button, Typography, Card } from '../../../components/ui';
import { tokens } from '../../../theme/tokens';

type LandingScreenNavigationProp = NativeStackNavigationProp<
  AuthStackParamList,
  'Landing'
>;

const LandingScreen: React.FC = () => {
  const navigation = useNavigation<LandingScreenNavigationProp>();

  const handleGetStarted = () => {
    navigation.navigate('SignIn');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={tokens.colors.neutral.white}
      />

      {/* Header with App Logo */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../assets/logo.png')}
            style={styles.logoIcon}
          />

          <Typography variant="h2" weight="bold" color="gray900">
            CalShotAI
          </Typography>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.heroSection}>
          <Typography
            variant="h1"
            weight="bold"
            align="center"
            color="gray900"
            style={styles.heroTitle}
          >
            Track Your Calories{'\n'}with AI Power
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="gray600"
            style={styles.heroSubtitle}
          >
            Simply scan your food and let our AI do the rest. Get accurate
            calorie counts and nutritional insights instantly.
          </Typography>
        </View>
      </View>

      {/* Bottom CTA */}
      <View style={styles.bottomSection}>
        <Button
          title="Get Started"
          variant="primary"
          size="lg"
          fullWidth
          onPress={handleGetStarted}
        />

        <Typography
          variant="caption"
          align="center"
          color="gray500"
          style={styles.termsText}
        >
          By continuing, you agree to our Terms of Service and Privacy Policy
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
    paddingHorizontal: tokens.spacing[6],
    paddingTop: tokens.spacing[5],
    paddingBottom: 24,
    marginTop: tokens.spacing[10],
  },
  logoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 78,
    height: 78,
    marginBottom: 4,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    paddingHorizontal: tokens.spacing[6],
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: tokens.spacing[16],
    borderTopWidth: 1,
    borderTopColor: tokens.colors.neutral.gray200,
    paddingTop: 8,
  },
  heroTitle: {
    marginBottom: tokens.spacing[2],
  },
  heroSubtitle: {
    paddingHorizontal: tokens.spacing[5],
  },
  featuresContainer: {
    gap: tokens.spacing[6],
  },
  featureWrapper: {
    marginBottom: tokens.spacing[4],
  },
  featureCard: {
    alignItems: 'center',
    minHeight: 160,
    justifyContent: 'center',
  },
  featureIcon: {
    marginBottom: tokens.spacing[3],
  },
  featureTitle: {
    marginBottom: tokens.spacing[2],
  },
  bottomSection: {
    paddingHorizontal: tokens.spacing[6],
    paddingBottom: 48,
    justifyContent: 'flex-end',
  },
  termsText: {
    marginTop: tokens.spacing[3],
  },
});

export default LandingScreen;
