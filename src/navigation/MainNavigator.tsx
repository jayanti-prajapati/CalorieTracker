import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, BarChart3, Plus, Users, User } from 'lucide-react-native';
import { MainTabParamList } from '../features/meal/types';
import DashboardScreen from '../features/dashboard/screens/DashboardScreen';
import AddMealScreen from '../features/meal/screens/AddMealScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import ProgressScreen from '../features/progress/screens/ProgressScreen';
import WaterScreen from '../screens/water/WaterScreen';
import ProfileNavigator from './ProfileNavigator';

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
              <View style={[styles.tabIcon, focused && styles.activeTabIcon]}>
                <Home size={20} color={focused ? '#FFFFFF' : '#666666'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Progress"
          component={ProgressScreen}
          options={{
            tabBarLabel: 'Progress',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTabIcon]}>
                <BarChart3 size={20} color={focused ? '#FFFFFF' : '#666666'} />
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
                <Plus size={28} color="#FFFFFF" />
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
              <View style={[styles.tabIcon, focused && styles.activeTabIcon]}>
                <Users size={20} color={focused ? '#FFFFFF' : '#666666'} />
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileNavigator}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }) => (
              <View style={[styles.tabIcon, focused && styles.activeTabIcon]}>
                <User size={20} color={focused ? '#FFFFFF' : '#666666'} />
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
    padding: 20,
    borderRadius: 28,
    height: 24,
    width: 24,
  },
  activeTabIcon: {
    backgroundColor: 'black',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
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
});

export default MainNavigator;
