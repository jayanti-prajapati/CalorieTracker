import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const WeeklyEnergyCard: React.FC = () => {
  const weeklyData = [
    { day: 'Sun', burned: 150, consumed: 650 },
    { day: 'Mon', burned: 80, consumed: 480 },
    { day: 'Tue', burned: 0, consumed: 0 },
    { day: 'Wed', burned: 0, consumed: 0 },
    { day: 'Thu', burned: 0, consumed: 0 },
    { day: 'Fri', burned: 0, consumed: 0 },
    { day: 'Sat', burned: 0, consumed: 0 },
  ];

  const maxValue = Math.max(
    ...weeklyData.map(d => Math.max(d.burned, d.consumed)),
    750,
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Energy</Text>

      {/* Energy Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Burned</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>261</Text>
            <Text style={styles.statUnit}>cal</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Consumed</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>1,191</Text>
            <Text style={styles.statUnit}>cal</Text>
          </View>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Energy</Text>
          <View style={styles.statValueContainer}>
            <Text style={styles.statValue}>+930</Text>
            <Text style={styles.statUnit}>cal</Text>
          </View>
        </View>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        {/* Y-axis labels */}
        <View style={styles.yAxis}>
          <Text style={styles.yAxisLabel}>750</Text>
          <Text style={styles.yAxisLabel}>500</Text>
          <Text style={styles.yAxisLabel}>250</Text>
          <Text style={styles.yAxisLabel}>0</Text>
        </View>

        {/* Bars */}
        <View style={styles.barsContainer}>
          {weeklyData.map((data, index) => (
            <View key={index} style={styles.barColumn}>
              <View style={styles.barPair}>
                {/* Consumed bar (green) */}
                {data.consumed > 0 && (
                  <View
                    style={[
                      styles.bar,
                      styles.consumedBar,
                      { height: `${(data.consumed / maxValue) * 100}%` },
                    ]}
                  />
                )}
                {/* Burned bar (orange) */}
                {data.burned > 0 && (
                  <View
                    style={[
                      styles.bar,
                      styles.burnedBar,
                      { height: `${(data.burned / maxValue) * 100}%` },
                    ]}
                  />
                )}
              </View>
              <Text style={styles.dayLabel}>{data.day}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.burnedBar]} />
          <Text style={styles.legendText}>Burned</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.consumedBar]} />
          <Text style={styles.legendText}>Consumed</Text>
        </View>
      </View>

      {/* Time period buttons */}
      <View style={styles.periodButtons}>
        <View style={[styles.periodButton, styles.activePeriod]}>
          <Text style={[styles.periodText, styles.activePeriodText]}>
            This wk
          </Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>Last wk</Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>2 wk ago</Text>
        </View>
        <View style={styles.periodButton}>
          <Text style={styles.periodText}>3 wk ago</Text>
        </View>
      </View>

      {/* Expenditure Changes */}
      <View style={styles.expenditureSection}>
        <Text style={styles.expenditureTitle}>Expenditure Changes</Text>

        <View style={styles.expenditureList}>
          {[
            { period: '3 day', change: -47.3, trend: 'decrease' },
            { period: '7 day', change: -16.6, trend: 'decrease' },
            { period: '14 day', change: -21.4, trend: 'decrease' },
            { period: '30 day', change: -74.2, trend: 'decrease' },
            { period: '90 day', change: 81.9, trend: 'increase' },
          ].map((item, index) => (
            <View key={index} style={styles.expenditureRow}>
              <View style={styles.expenditurePeriod}>
                <View
                  style={[
                    styles.trendIcon,
                    item.trend === 'decrease'
                      ? styles.decreaseTrend
                      : styles.increaseTrend,
                  ]}
                />
                <Text style={styles.expenditurePeriodText}>{item.period}</Text>
              </View>

              <Text style={styles.expenditureChange}>
                {item.change > 0 ? '+' : ''}
                {item.change} cal
              </Text>

              <Text
                style={[
                  styles.expenditureTrend,
                  item.trend === 'decrease'
                    ? styles.decreaseText
                    : styles.increaseText,
                ]}
              >
                {item.trend === 'decrease' ? 'Decrease' : 'Increase'}
              </Text>
            </View>
          ))}
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
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  statUnit: {
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 4,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
    marginBottom: 16,
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
  barsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 8,
  },
  barColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barPair: {
    flexDirection: 'row',
    height: 160,
    alignItems: 'flex-end',
    marginBottom: 8,
    gap: 2,
  },
  bar: {
    width: 10,
    borderRadius: 2,
  },
  burnedBar: {
    backgroundColor: '#F59E0B',
  },
  consumedBar: {
    backgroundColor: '#10B981',
  },
  dayLabel: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  legend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
    color: '#6C757D',
  },
  periodButtons: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 32,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
  },
  activePeriod: {
    backgroundColor: '#1A1A1A',
  },
  periodText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  expenditureSection: {
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    paddingTop: 24,
  },
  expenditureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 20,
  },
  expenditureList: {
    gap: 16,
  },
  expenditureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  expenditurePeriod: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  trendIcon: {
    width: 20,
    height: 4,
    borderRadius: 2,
    marginRight: 12,
  },
  decreaseTrend: {
    backgroundColor: '#F59E0B',
  },
  increaseTrend: {
    backgroundColor: '#10B981',
  },
  expenditurePeriodText: {
    fontSize: 16,
    color: '#1A1A1A',
    fontWeight: '500',
  },
  expenditureChange: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    minWidth: 80,
    textAlign: 'center',
  },
  expenditureTrend: {
    fontSize: 14,
    fontWeight: '500',
    minWidth: 80,
    textAlign: 'right',
  },
  decreaseText: {
    color: '#F59E0B',
  },
  increaseText: {
    color: '#10B981',
  },
});
