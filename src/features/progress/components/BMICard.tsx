import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BMICardProps {
  currentWeight: number;
  height: number; // in cm
}

export const BMICard: React.FC<BMICardProps> = ({ currentWeight, height }) => {
  // Calculate BMI
  const heightInMeters = height / 100;
  const bmi = currentWeight / (heightInMeters * heightInMeters);

  // Determine BMI category and color
  const getBMICategory = (bmiValue: number) => {
    if (bmiValue < 18.5) return { category: 'Underweight', color: '#3B82F6' };
    if (bmiValue < 25) return { category: 'Healthy', color: '#10B981' };
    if (bmiValue < 30) return { category: 'Overweight', color: '#F59E0B' };
    return { category: 'Obese', color: '#EF4444' };
  };

  const { category, color } = getBMICategory(bmi);

  // BMI scale positions (approximate percentages)
  const getScalePosition = (bmiValue: number) => {
    if (bmiValue < 18.5) return (bmiValue / 18.5) * 20; // 0-20%
    if (bmiValue < 25) return 20 + ((bmiValue - 18.5) / (25 - 18.5)) * 30; // 20-50%
    if (bmiValue < 30) return 50 + ((bmiValue - 25) / (30 - 25)) * 30; // 50-80%
    return Math.min(80 + ((bmiValue - 30) / 10) * 20, 100); // 80-100%
  };

  const indicatorPosition = getScalePosition(bmi);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your BMI</Text>
        <View style={styles.infoIcon}>
          <Text style={styles.infoText}>?</Text>
        </View>
      </View>

      <View style={styles.bmiContainer}>
        <Text style={styles.bmiValue}>{bmi.toFixed(1)}</Text>
        <View style={styles.categoryContainer}>
          <Text style={styles.categoryLabel}>Your weight is</Text>
          <Text style={[styles.categoryText, { color }]}>{category}</Text>
        </View>
      </View>

      {/* BMI Scale */}
      <View style={styles.scaleContainer}>
        {/* Scale bar */}
        <View style={styles.scaleBar}>
          <View
            style={[
              styles.scaleSegment,
              { backgroundColor: '#3B82F6', flex: 20 },
            ]}
          />
          <View
            style={[
              styles.scaleSegment,
              { backgroundColor: '#10B981', flex: 30 },
            ]}
          />
          <View
            style={[
              styles.scaleSegment,
              { backgroundColor: '#F59E0B', flex: 30 },
            ]}
          />
          <View
            style={[
              styles.scaleSegment,
              { backgroundColor: '#EF4444', flex: 20 },
            ]}
          />
        </View>

        {/* BMI indicator */}
        <View style={[styles.indicator, { left: `${indicatorPosition}%` }]} />
      </View>

      {/* Scale labels */}
      <View style={styles.scaleLabels}>
        <View style={styles.labelGroup}>
          <View style={[styles.labelDot, { backgroundColor: '#3B82F6' }]} />
          <Text style={styles.labelText}>Underweight</Text>
          <Text style={styles.labelRange}>&lt;18.5</Text>
        </View>

        <View style={styles.labelGroup}>
          <View style={[styles.labelDot, { backgroundColor: '#10B981' }]} />
          <Text style={styles.labelText}>Healthy</Text>
          <Text style={styles.labelRange}>18.5–24.9</Text>
        </View>

        <View style={styles.labelGroup}>
          <View style={[styles.labelDot, { backgroundColor: '#F59E0B' }]} />
          <Text style={styles.labelText}>Overweight</Text>
          <Text style={styles.labelRange}>25.0–29.9</Text>
        </View>

        <View style={styles.labelGroup}>
          <View style={[styles.labelDot, { backgroundColor: '#EF4444' }]} />
          <Text style={styles.labelText}>Obese</Text>
          <Text style={styles.labelRange}>&gt;30.0</Text>
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
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  infoIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E9ECEF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '600',
  },
  bmiContainer: {
    marginBottom: 32,
  },
  bmiValue: {
    fontSize: 48,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryLabel: {
    fontSize: 16,
    color: '#6C757D',
    marginRight: 8,
  },
  categoryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  scaleContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  scaleBar: {
    flexDirection: 'row',
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  scaleSegment: {
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    top: -4,
    width: 2,
    height: 16,
    backgroundColor: '#1A1A1A',
    borderRadius: 1,
    transform: [{ translateX: -1 }],
  },
  scaleLabels: {
    gap: 12,
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  labelText: {
    fontSize: 14,
    color: '#1A1A1A',
    fontWeight: '500',
    flex: 1,
  },
  labelRange: {
    fontSize: 14,
    color: '#6C757D',
  },
});
