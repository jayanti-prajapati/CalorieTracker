import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import {
  DayStreakCard,
  BadgesEarnedCard,
  WeightProgressCard,
  WeightChangesCard,
  DailyAverageCaloriesCard,
  WeeklyEnergyCard,
  BMICard,
} from '../components';

const ProgressScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Progress</Text>
        </View>

        {/* Top Row - Day Streak and Badges */}
        <View style={styles.topRow}>
          <View style={styles.halfCard}>
            <DayStreakCard streak={2} />
          </View>
          <View style={styles.halfCard}>
            <BadgesEarnedCard badgeCount={3} />
          </View>
        </View>

        {/* Current Weight Section */}
        <View style={styles.weightSection}>
          <Text style={styles.currentWeightLabel}>Current Weight</Text>
          <Text style={styles.currentWeight}>77.8 kg</Text>
          <View style={styles.weightDetails}>
            <View style={styles.weightDetail}>
              <Text style={styles.weightDetailLabel}>Start: </Text>
              <Text style={styles.weightDetailValue}>77.8 kg</Text>
            </View>
            <View style={styles.weightDetail}>
              <Text style={styles.weightDetailLabel}>Goal: </Text>
              <Text style={styles.weightDetailValue}>54.4 kg</Text>
            </View>
          </View>
          <Text style={styles.goalDate}>At your goal by Feb 11, 2027.</Text>
          <Text style={styles.nextWeighIn}>Next weigh-in: 7d</Text>
        </View>

        {/* Weight Progress Chart */}
        <WeightProgressCard />

        {/* Weight Changes */}
        <WeightChangesCard />

        {/* Daily Average Calories */}
        <DailyAverageCaloriesCard />

        {/* Weekly Energy */}
        <WeeklyEnergyCard />

        {/* BMI Card */}
        <BMICard currentWeight={77.8} height={170} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  topRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 20,
    gap: 12,
  },
  halfCard: {
    flex: 1,
  },
  weightSection: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginBottom: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  currentWeightLabel: {
    fontSize: 16,
    color: '#6C757D',
    marginBottom: 8,
  },
  currentWeight: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  weightDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  weightDetail: {
    flexDirection: 'row',
  },
  weightDetailLabel: {
    fontSize: 16,
    color: '#6C757D',
  },
  weightDetailValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  goalDate: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  nextWeighIn: {
    fontSize: 14,
    color: '#6C757D',
  },
});

export default ProgressScreen;
