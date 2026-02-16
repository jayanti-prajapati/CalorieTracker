import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface WeightChange {
  period: string;
  change: number;
  trend: 'decrease' | 'increase' | 'no-change';
}

export const WeightChangesCard: React.FC = () => {
  const weightChanges: WeightChange[] = [
    { period: '3 day', change: 0.0, trend: 'no-change' },
    { period: '7 day', change: 0.0, trend: 'no-change' },
    { period: '14 day', change: 0.0, trend: 'no-change' },
    { period: '30 day', change: 0.0, trend: 'no-change' },
    { period: '90 day', change: 0.0, trend: 'no-change' },
    { period: 'All Time', change: 0.0, trend: 'no-change' },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'decrease':
        return '↘️';
      case 'increase':
        return '↗️';
      default:
        return '→';
    }
  };

  const getTrendText = (trend: string) => {
    switch (trend) {
      case 'decrease':
        return 'Decrease';
      case 'increase':
        return 'Increase';
      default:
        return 'No change';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'decrease':
        return '#10B981';
      case 'increase':
        return '#EF4444';
      default:
        return '#6B7280';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weight Changes</Text>

      <View style={styles.changesContainer}>
        {weightChanges.map((item, index) => (
          <View key={index} style={styles.changeRow}>
            <View style={styles.periodContainer}>
              <View style={styles.progressBar} />
              <Text style={styles.periodText}>{item.period}</Text>
            </View>

            <Text style={styles.changeValue}>
              {item.change > 0 ? '+' : ''}
              {item.change.toFixed(1)} kg
            </Text>

            <View style={styles.trendContainer}>
              <Text style={styles.trendIcon}>{getTrendIcon(item.trend)}</Text>
              <Text
                style={[styles.trendText, { color: getTrendColor(item.trend) }]}
              >
                {getTrendText(item.trend)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  changesContainer: {
    gap: 16,
  },
  changeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  periodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  progressBar: {
    width: 40,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 2,
    marginRight: 12,
  },
  periodText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  changeValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    minWidth: 60,
    textAlign: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 100,
    justifyContent: 'flex-end',
  },
  trendIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  trendText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
