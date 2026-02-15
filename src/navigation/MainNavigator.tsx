import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MainTabParamList } from '../types';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import AddMealScreen from '../features/meal/screens/AddMealScreen';
import WaterScreen from '../screens/water/WaterScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';

// Create a placeholder Groups screen
const GroupsScreen: React.FC = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F8F9FA',
    }}
  >
    <Text style={{ fontSize: 18, color: '#666' }}>Groups Coming Soon</Text>
  </View>
);

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigator: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 0,
            elevation: 8,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            height: 80,
            paddingBottom: 20,
            paddingTop: 10,
            borderRadius: 20,
            marginBottom: 10,
            marginHorizontal: 5,
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#999',
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
            marginTop: 4,
          },
        }}
      >
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }) => (
              <View>
                <Text
                  style={[
                    styles.iconText,
                    { color: focused ? '#FFFFFF' : '#000000' },
                  ]}
                >
                  🏠
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Water"
          component={WaterScreen}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: ({ focused }) => (
              <View>
                <Text
                  style={[
                    styles.iconText,
                    { color: focused ? '#FFFFFF' : '#666' },
                  ]}
                >
                  📊
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="AddMeal"
          component={AddMealScreen}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View style={styles.plusButton}>
                <Text style={styles.plusIcon}>+</Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Groups"
          component={GroupsScreen}
          options={{
            tabBarLabel: 'Groups',
            tabBarIcon: ({ focused }) => (
              <View>
                <Text
                  style={[
                    styles.iconText,
                    { color: focused ? '#FFFFFF' : '#999' },
                  ]}
                >
                  👥
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <View>
                <Text
                  style={[
                    styles.iconText,
                    { color: focused ? '#FFFFFF' : '#999' },
                  ]}
                >
                  👤
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  tabIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  activeTabIcon: {
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  iconText: {
    fontSize: 20,
  },
  plusButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1A1A1A',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  plusIcon: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default MainNavigator;
