import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { lightTheme } from '../../theme';

const PersonalInfoScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Personal Info</Text>
        <Text style={styles.subtitle}>Coming soon...</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightTheme.colors.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: lightTheme.spacing.lg,
  },
  title: {
    ...lightTheme.typography.h1,
    color: lightTheme.colors.text,
    marginBottom: lightTheme.spacing.md,
  },
  subtitle: {
    ...lightTheme.typography.body,
    color: lightTheme.colors.textSecondary,
  },
});

export default PersonalInfoScreen;
