import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useAuthStore } from '../../auth/stores/authStore';
import { useDashboardStore } from '../stores/dashboardStore';
import { lightTheme } from '../../../theme';
import { useMealStore } from '../../meal/stores/mealStore';
import { timeToMinutesAgo } from '../../../utils';
import { Card } from '../../../components/ui';
import { MealCard } from '../components/MealCard';
import { WeeklyCalendar } from '../components/WeeklyCalendar';
import { HealthCard, MealDetail } from '../components';
import { MealEntry } from '../../meal/types';

interface DashboardScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const { user } = useAuthStore();
  const {
    data: dashboardData,
    selectedDate: storeSelectedDate,
    isRefreshing,
    setSelectedDate: setStoreSelectedDate,
    refreshDashboard,
  } = useDashboardStore();
  const { meals } = useMealStore();
  console.log(meals);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Sync local selectedDate with store
  useEffect(() => {
    const dateString = selectedDate.toISOString().split('T')[0] || '';
    if (dateString !== storeSelectedDate) {
      setStoreSelectedDate(dateString);
    }
  }, [selectedDate, storeSelectedDate, setStoreSelectedDate]);

  const today = selectedDate.toISOString().split('T')[0];

  // Navigation handlers
  const handleMealPress = (meal: MealEntry) => {
    navigation.navigate('MealDetail', { mealId: meal.id });
  };

  // Use dashboard data from store, fallback to default values
  const dailyNutrition = dashboardData?.stats
    ? {
        totalCalories: dashboardData.stats.totalCalories,
        targetCalories: dashboardData.stats.targetCalories,
        remainingCalories: dashboardData.stats.remainingCalories,
        totalProtein: dashboardData.stats.totalProtein,
        totalCarbs: dashboardData.stats.totalCarbs,
        totalFat: dashboardData.stats.totalFat,
        totalFiber: dashboardData.stats.totalFiber,
        totalSugar: dashboardData.stats.totalSugar,
        totalSodium: dashboardData.stats.totalSodium,
      }
    : {
        totalCalories: 0,
        targetCalories: user?.targetCalories || 2712,
        remainingCalories: user?.targetCalories || 2712,
        totalProtein: 0,
        totalCarbs: 0,
        totalFat: 0,
        totalFiber: 0,
        totalSugar: 0,
        totalSodium: 0,
      };

  const onRefresh = React.useCallback(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const calorieProgress =
    dailyNutrition.targetCalories > 0
      ? (dailyNutrition.totalCalories / dailyNutrition.targetCalories) * 100
      : 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.appIcon}>🍎</Text>
            <Text style={styles.appName}>Cal AI</Text>
          </View>
          <View style={styles.streakBadge}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakNumber}>
              {dashboardData?.streakCount || 1}
            </Text>
          </View>
        </View>

        {/* Weekly Calendar */}
        <WeeklyCalendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        {/* Main Calorie Card */}

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ ...styles.mainCard, width: '45%' }}>
            <View style={styles.calorieSection}>
              <Text style={styles.calorieNumber}>
                {dailyNutrition.totalCalories}
              </Text>
              <Text style={styles.calorieTarget}>
                /{dailyNutrition.targetCalories}
              </Text>
              <Text style={styles.calorieLabel}>Calories eaten</Text>
              <Text style={styles.calorieRemaining}>
                🔥 +{Math.max(0, dailyNutrition.remainingCalories)}
              </Text>
            </View>
            <View style={styles.circularProgress}>
              <View style={styles.progressCircle}>
                <Text style={styles.progressText}>🔥</Text>
              </View>
            </View>
          </View>
          <View style={{ width: '50%', paddingLeft: 20 }}>
            <HealthCard
              maxScore={90}
              score={dashboardData?.healthScore || 75}
              recommendation="Your nutrition is well balanced. Keep up the excellent work!"
            />
          </View>
        </ScrollView>
        {/* Macros Carousel */}
        <View
          style={{
            paddingBottom: 20,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <Card
              style={{
                alignItems: 'center',
                marginRight: 8,
              }}
            >
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.proteinCircle]}>
                  <Text style={styles.macroIcon}>🥩</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalProtein}/0g
                </Text>
                <Text style={styles.macroLabel}>Protein eaten</Text>
              </View>
            </Card>
            <Card style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.carbsCircle]}>
                  <Text style={styles.macroIcon}>🌾</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalCarbs}/0g
                </Text>
                <Text style={styles.macroLabel}>Carbs eaten</Text>
              </View>{' '}
            </Card>
            <Card style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.fatCircle]}>
                  <Text style={styles.macroIcon}>🧈</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalFat}/0g
                </Text>
                <Text style={styles.macroLabel}>Fat eaten</Text>
              </View>
            </Card>
            <Card style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.proteinCircle]}>
                  <Text style={styles.macroIcon}>🥩</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalFiber}/0g
                </Text>
                <Text style={styles.macroLabel}>Fiber eaten</Text>
              </View>
            </Card>
            <Card style={{ alignItems: 'center', marginHorizontal: 8 }}>
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.carbsCircle]}>
                  <Text style={styles.macroIcon}>🌾</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalSugar}/0g
                </Text>
                <Text style={styles.macroLabel}>Sugar eaten</Text>
              </View>{' '}
            </Card>
            <Card style={{ alignItems: 'center', marginLeft: 8 }}>
              <View style={styles.macroItem}>
                <View style={[styles.macroCircle, styles.fatCircle]}>
                  <Text style={styles.macroIcon}>🧈</Text>
                </View>
                <Text style={styles.macroValue}>
                  {dailyNutrition.totalFat}/0g
                </Text>
                <Text style={styles.macroLabel}>Fat eaten</Text>
              </View>
            </Card>
          </ScrollView>
        </View>

        {/* Recently uploaded */}
        <View style={styles.recentMealsContainer}>
          <Text style={styles.recentMealsTitle}>Recently uploaded</Text>
          {meals?.map(meal => (
            <MealCard
              key={meal.id}
              meal={meal}
              onPress={() => handleMealPress(meal)}
            />
          )) || (
            <View style={styles.emptyMealsContainer}>
              <Text style={styles.emptyMealsText}>No meals logged today</Text>
              <Text style={styles.emptyMealsSubtext}>
                Tap the camera to add your first meal!
              </Text>
            </View>
          )}
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  appIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  recentMealsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    paddingBottom: 8,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  streakNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  calendarDay: {
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    minWidth: 40,
  },
  selectedDay: {
    backgroundColor: '#1A1A1A',
  },
  todayDay: {
    borderColor: '#1A1A1A',
    borderWidth: 1,
  },
  dayName: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  selectedDayText: {
    color: '#FFF',
  },
  mainCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 16,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  calorieSection: {
    flex: 1,
  },
  calorieNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1A1A1A',
    lineHeight: 56,
  },
  calorieTarget: {
    fontSize: 18,
    color: '#999',
    marginTop: -8,
  },
  calorieLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  calorieRemaining: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
    marginTop: 8,
  },
  circularProgress: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#1A1A1A',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  progressText: {
    fontSize: 24,
  },
  macrosScrollView: {
    marginBottom: 16,
  },
  macrosCarousel: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    gap: 8,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  macroItem: {
    alignItems: 'center',
    minWidth: 80,
    flex: 1,
  },
  macroCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  proteinCircle: {
    borderColor: '#FF6B6B',
  },
  carbsCircle: {
    borderColor: '#FFB347',
  },
  fatCircle: {
    borderColor: '#4DABF7',
  },
  macroIcon: {
    fontSize: 20,
  },
  macroValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  macroLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  recentMeals: {
    paddingHorizontal: 20,
  },
  mealItem: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  mealInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  mealTime: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  mealCalories: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calorieIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  mealCalorieText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  mealMacros: {
    flexDirection: 'row',
    marginTop: 4,
  },
  macroText: {
    fontSize: 11,
    color: '#666',
    marginRight: 12,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E5E5',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1A1A1A',
    borderRadius: 4,
  },
  macrosCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  noMealsText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
    paddingVertical: 24,
  },
  statsCard: {
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
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
  macroAmount: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  recentMealsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  emptyMealsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
  },
  emptyMealsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptyMealsSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default DashboardScreen;
