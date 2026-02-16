import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type Props = {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
};
export const WeeklyCalendar = ({ selectedDate, setSelectedDate }: Props) => {
  const scrollViewRef = useRef<ScrollView>(null);

  // Generate 15 days (7 previous + today + 7 next)
  const getFifteenDays = () => {
    const dates = [];
    const today = new Date();

    // Start from 7 days ago
    for (let i = -7; i <= 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };
  const weekDates = getFifteenDays();

  // Auto-scroll to center the selected date
  useEffect(() => {
    const selectedIndex = weekDates.findIndex(
      date => date.toDateString() === selectedDate.toDateString(),
    );

    if (selectedIndex !== -1 && scrollViewRef.current) {
      const itemWidth = 64; // calendarDay width + margins
      const scrollPosition = selectedIndex * itemWidth - itemWidth * 3; // Center by offsetting 3 items

      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: Math.max(0, scrollPosition),
          animated: true,
        });
      }, 100);
    }
  }, [selectedDate, weekDates]);

  return (
    <ScrollView
      ref={scrollViewRef}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: 20 }}
    >
      <View style={styles.calendar}>
        {weekDates.map((date, index) => {
          const isSelected =
            date.toDateString() === selectedDate.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.calendarDay,
                isSelected && styles.selectedDay,
                isToday && styles.todayDay,
              ]}
              onPress={() => setSelectedDate(date)}
            >
              <Text
                style={[styles.dayName, isSelected && styles.selectedDayText]}
              >
                {dayNames[date.getDay()]}
              </Text>
              <Text
                style={[styles.dayNumber, isSelected && styles.selectedDayText]}
              >
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  calendar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  calendarDay: {
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginHorizontal: 1,
    width: 52,
  },
  selectedDay: {
    backgroundColor: '#1A1A1A',
  },
  todayDay: {
    borderColor: '#1A1A1A',
    borderWidth: 1,
    borderStyle: 'dashed',
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
});
