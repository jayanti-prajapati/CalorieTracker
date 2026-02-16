import { MealEntry } from '../../meal/types';
import { timeToMinutesAgo } from '../../../utils';
import { View, Image, Text, StyleSheet } from 'react-native';

export const MealCard = ({ meal }: { meal: MealEntry }) => {
  return (
    <View key={meal.id} style={styles.mealCard}>
      {meal?.imageUrl ? (
        <Image source={{ uri: meal.imageUrl }} style={styles.mealCardImage} />
      ) : (
        <View style={styles.mealCardImagePlaceholder}>
          <Text style={styles.mealCardImageText}>{meal?.name?.charAt(0)}</Text>
        </View>
      )}
      <View style={styles.mealCardContent}>
        <View style={styles.mealCardHeader}>
          <Text style={styles.mealCardName} numberOfLines={1}>
            {meal.name}
          </Text>
          <Text style={styles.mealCardTime}>
            {timeToMinutesAgo(new Date(meal?.date))}
          </Text>
        </View>
        <View style={styles.mealCardCalories}>
          <Text style={styles.calorieIcon}>🔥</Text>
          <Text style={styles.mealCardCalorieText}>
            {meal?.calories} calories
          </Text>
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
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mealCardImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
  },
  mealCardImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 16,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealCardImageText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  mealCardContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  mealCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  mealCardName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    flex: 1,
  },
  mealCardTime: {
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  mealCardCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealCardCalorieText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginLeft: 4,
  },
  mealCardMacros: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  calorieIcon: {
    fontSize: 12,
    marginRight: 4,
  },

  macroItem: {
    alignItems: 'center',
    minWidth: 80,
    flex: 1,
  },
  macroIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  macroAmount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
});
