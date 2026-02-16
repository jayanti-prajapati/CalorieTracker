import { MealEntry } from '../../meal/types';
import { timeToMinutesAgo } from '../../../utils';
import { View, Image, Text, StyleSheet } from 'react-native';

export const MealCard = ({ meal }: { meal: MealEntry }) => {
  return (
    <View style={styles.mealCard}>
      {/* Left Image - 40% */}
      <View style={styles.imageContainer}>
        {meal?.imageUrl ? (
          <Image source={{ uri: meal.imageUrl }} style={styles.mealCardImage} />
        ) : (
          <View style={styles.mealCardImagePlaceholder}>
            <Text style={styles.mealCardImageText}>🍽️</Text>
          </View>
        )}
      </View>

      {/* Right Content - 60% */}
      <View style={styles.mealCardContent}>
        <View style={styles.mealCardHeader}>
          <Text style={styles.mealCardName} numberOfLines={2}>
            {meal.name}
          </Text>
          <Text style={styles.mealCardTime}>
            {timeToMinutesAgo(new Date(meal?.date))}
          </Text>
        </View>

        <View style={styles.mealCardCalories}>
          <Text style={styles.calorieIcon}>🔥</Text>
          <Text style={styles.mealCardCalorieText}>{meal?.calories} cal</Text>
        </View>

        <View style={styles.mealCardMacros}>
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>🥩</Text>
            <Text style={styles.macroAmount}>{meal?.protein}g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>🌾</Text>
            <Text style={styles.macroAmount}>{meal?.carbs}g</Text>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroIcon}>💧</Text>
            <Text style={styles.macroAmount}>{meal?.fat}g</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
    overflow: 'hidden',
    minHeight: 120,
  },
  imageContainer: {
    width: '40%',
    padding: 12,
  },
  mealCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 16,
  },
  mealCardImagePlaceholder: {
    width: '100%',
    height: 120,
    borderRadius: 16,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E9ECEF',
    borderStyle: 'dashed',
  },
  mealCardImageText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#6C757D',
    textTransform: 'uppercase',
  },
  mealCardContent: {
    flex: 1,
    padding: 16,
    paddingLeft: 8,
    justifyContent: 'space-between',
  },
  mealCardHeader: {
    marginBottom: 8,
  },
  mealCardName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
    lineHeight: 22,
  },
  mealCardTime: {
    fontSize: 13,
    color: '#6C757D',
    fontWeight: '500',
  },
  mealCardCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  calorieIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  mealCardCalorieText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E65100',
  },
  mealCardMacros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  macroItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    flex: 1,
    marginHorizontal: 2,
  },
  macroIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  macroAmount: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '600',
  },
});
