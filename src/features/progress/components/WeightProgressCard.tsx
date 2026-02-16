import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WeightProgressCard: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Weight Progress</Text>
        <Text style={styles.percentage}>0% of goal</Text>
      </View>

      {/* Chart Area */}
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          <Text style={styles.yAxisLabel}>82</Text>
          <Text style={styles.yAxisLabel}>80</Text>
          <Text style={styles.yAxisLabel}>78</Text>
          <Text style={styles.yAxisLabel}>76</Text>
          <Text style={styles.yAxisLabel}>74</Text>
        </View>

        {/* Chart area with horizontal line */}
        <View style={styles.chartArea}>
          <View style={styles.gridLines}>
            {[...Array(5)].map((_, index) => (
              <View key={index} style={styles.gridLine} />
            ))}
          </View>
          {/* Weight line at 78kg level */}
          <View style={styles.weightLine} />
        </View>
      </View>

      {/* Time period buttons */}
      <View style={styles.periodButtons}>
        <View style={[styles.periodButton, styles.activePeriod]}>
          <Text style={[styles.periodText, styles.activePeriodText]}>90D</Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>6M</Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>1Y</Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>ALL</Text>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  percentage: {
    fontSize: 14,
    color: '#6C757D',
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 24,
  },
  yAxis: {
    justifyContent: 'space-between',
    paddingRight: 12,
    height: '100%',
  },
  yAxisLabel: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'right',
  },
  chartArea: {
    flex: 1,
    position: 'relative',
  },
  gridLines: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
  },
  gridLine: {
    height: 1,
    backgroundColor: '#E9ECEF',
  },
  weightLine: {
    position: 'absolute',
    top: '50%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#1A1A1A',
    borderRadius: 1,
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
  },
  activePeriod: {
    backgroundColor: '#1A1A1A',
  },
  periodText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
});
