import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface DayStreakCardProps {
  streak: number;
}

export const DayStreakCard: React.FC<DayStreakCardProps> = ({ streak }) => {
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <View style={styles.container}>
      {/* Fire Icon and Streak Number */}
      <View style={styles.streakSection}>
        <View style={styles.fireIconContainer}>
          <Text style={styles.fireIcon}>🔥</Text>
          <Text style={styles.sparkle}>✨</Text>
        </View>
        <Text style={styles.streakNumber}>{streak}</Text>
      </View>

      {/* Day Streak Label */}
      <Text style={styles.streakLabel}>Day Streak</Text>

      {/* Days of Week */}
      <View style={styles.daysContainer}>
        {daysOfWeek.map((day, index) => (
          <View key={index} style={styles.dayContainer}>
            <Text style={styles.dayLetter}>{day}</Text>
            <View
              style={[
                styles.dayCircle,
                index < streak ? styles.completedDay : styles.incompleteDay,
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  streakSection: {
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  fireIconContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  fireIcon: {
    fontSize: 32,
  },
  sparkle: {
    fontSize: 16,
    position: 'absolute',
    top: -5,
    right: -10,
  },
  streakNumber: {
    fontSize: 32,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  streakLabel: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 16,
  },
  daysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayContainer: {
    alignItems: 'center',
  },
  dayLetter: {
    fontSize: 12,
    color: '#6C757D',
    marginBottom: 4,
    fontWeight: '500',
  },
  dayCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  completedDay: {
    backgroundColor: '#FF9800',
  },
  incompleteDay: {
    backgroundColor: '#E9ECEF',
  },
});
