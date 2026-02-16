import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const DailyAverageCaloriesCard: React.FC = () => {
  const weeklyData = [
    { day: 'Sun', calories: 650, protein: 25, carbs: 45, fat: 15 },
    { day: 'Mon', calories: 480, protein: 20, carbs: 35, fat: 12 },
    { day: 'Tue', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { day: 'Wed', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { day: 'Thu', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { day: 'Fri', calories: 0, protein: 0, carbs: 0, fat: 0 },
    { day: 'Sat', calories: 0, protein: 0, carbs: 0, fat: 0 },
  ];

  const maxCalories = Math.max(...weeklyData.map(d => d.calories), 750);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Daily Average Calories</Text>

      <View style={styles.averageContainer}>
        <Text style={styles.averageNumber}>595</Text>
        <Text style={styles.averageLabel}>cals</Text>
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
              <View style={styles.bar}>
                {data.calories > 0 && (
                  <>
                    {/* Fat (blue) */}
                    <View
                      style={[
                        styles.barSegment,
                        styles.fatSegment,
                        { height: `${(data.fat / maxCalories) * 100}%` },
                      ]}
                    />
                    {/* Carbs (yellow) */}
                    <View
                      style={[
                        styles.barSegment,
                        styles.carbsSegment,
                        { height: `${(data.carbs / maxCalories) * 100}%` },
                      ]}
                    />
                    {/* Protein (red) */}
                    <View
                      style={[
                        styles.barSegment,
                        styles.proteinSegment,
                        { height: `${(data.protein / maxCalories) * 100}%` },
                      ]}
                    />
                  </>
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
          <View style={[styles.legendColor, styles.proteinSegment]} />
          <Text style={styles.legendText}>Protein</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.carbsSegment]} />
          <Text style={styles.legendText}>Carbs</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, styles.fatSegment]} />
          <Text style={styles.legendText}>Fats</Text>
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
    marginBottom: 16,
  },
  averageContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 24,
  },
  averageNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  averageLabel: {
    fontSize: 16,
    color: '#6C757D',
    marginLeft: 8,
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
  bar: {
    width: 24,
    height: 160,
    justifyContent: 'flex-end',
    marginBottom: 8,
  },
  barSegment: {
    width: '100%',
    borderRadius: 2,
  },
  proteinSegment: {
    backgroundColor: '#EF4444',
  },
  carbsSegment: {
    backgroundColor: '#F59E0B',
  },
  fatSegment: {
    backgroundColor: '#3B82F6',
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
});
