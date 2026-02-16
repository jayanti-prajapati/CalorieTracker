import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getHealthScoreColor } from '../utils/healthScore';

interface HealthCardProps {
  score: number;
  maxScore: number;
  recommendation: string;
}

export const HealthCard: React.FC<HealthCardProps> = ({
  score,
  maxScore,
  recommendation,
}) => {
  const scorePercentage = (score / maxScore) * 100;
  const progressColor = getHealthScoreColor(score, maxScore);

  return (
    <View style={styles.container}>
      {/* Header with Health Score and Score Value */}
      <View style={styles.header}>
        <Text style={styles.title}>Health Score</Text>
        <Text style={styles.score}>
          {score}/{maxScore}
        </Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <View
            style={[
              styles.progressFill,
              {
                width: `${scorePercentage}%`,
                backgroundColor: progressColor,
              },
            ]}
          />
        </View>
      </View>

      {/* Recommendation Text */}
      <Text style={styles.recommendation}>{recommendation}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  score: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  recommendation: {
    fontSize: 16,
    lineHeight: 24,
    color: '#6C757D',
    fontWeight: '400',
  },
});
