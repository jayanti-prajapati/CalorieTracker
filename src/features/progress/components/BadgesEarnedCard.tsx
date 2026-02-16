import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface BadgesEarnedCardProps {
  badgeCount: number;
}

export const BadgesEarnedCard: React.FC<BadgesEarnedCardProps> = ({
  badgeCount,
}) => {
  return (
    <View style={styles.container}>
      {/* Badge Icon */}
      <View style={styles.badgeIconContainer}>
        <View style={styles.badgeIcon}>
          <Text style={styles.badgeNumber}>{badgeCount}</Text>
        </View>
      </View>

      {/* Badges Earned Label */}
      <Text style={styles.badgeLabel}>Badges Earned</Text>

      {/* Badge Icons Row */}
      <View style={styles.badgesRow}>
        <View style={[styles.badge, styles.pinkBadge]}>
          <Text style={styles.badgeEmoji}>🏆</Text>
        </View>
        <View style={[styles.badge, styles.purpleBadge]}>
          <Text style={styles.badgeEmoji}>⭐</Text>
        </View>
        <View style={[styles.badge, styles.blueBadge]}>
          <Text style={styles.badgeEmoji}>🎯</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  badgeIconContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A5568',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  badgeNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  badgeLabel: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    marginBottom: 16,
  },
  badgesRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  badge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinkBadge: {
    backgroundColor: '#EC4899',
  },
  purpleBadge: {
    backgroundColor: '#8B5CF6',
  },
  blueBadge: {
    backgroundColor: '#06B6D4',
  },
  badgeEmoji: {
    fontSize: 16,
  },
});
