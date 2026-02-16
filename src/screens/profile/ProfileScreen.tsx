import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  ChevronRight,
  UserCircle,
  Settings,
  Globe,
  Users as UsersIcon,
  Heart,
  Check,
  Crown,
} from 'lucide-react-native';
import { tokens } from '../../theme/tokens';
import { PROFILE_SECTIONS } from './ProfileSections';
import { ProfileStackParamList } from '../../features/meal/types';
import { useAuthStore } from '../../features/auth/stores/authStore';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  ProfileStackParamList,
  'ProfileMain'
>;

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { user } = useAuthStore();

  const handleNavigate = (route: keyof ProfileStackParamList | null) => {
    if (route && route !== 'ProfileMain') {
      navigation.navigate(route);
    }
  };

  const getIcon = (iconName: string, size: number = 20, color: string = tokens.colors.neutral.gray900) => {
    switch (iconName) {
      case 'id-card':
        return <UserCircle size={size} color={color} />;
      case 'settings':
        return <Settings size={size} color={color} />;
      case 'globe':
        return <Globe size={size} color={color} />;
      case 'users':
        return <UsersIcon size={size} color={color} />;
      case 'heart':
        return <Heart size={size} color={color} />;
      default:
        return <UserCircle size={size} color={color} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.neutral.gray50} />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>

        <View style={styles.userCard}>
          <View style={styles.userInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.avatar}</Text>
            </View>
            <View style={styles.userDetails}>
              <View style={styles.nameContainer}>
                {user?.isPremium && (
                  <Crown size={16} color="#FFD700" fill="#FFD700" style={styles.crownIcon} />
                )}
                <Text style={styles.premiumBadge}>Premium</Text>
              </View>
              <Text style={styles.userName}>{user?.name}</Text>
              <Text style={styles.userHandle}>{user?.username}</Text>
            </View>
          </View>
          <ChevronRight size={24} color={tokens.colors.neutral.gray400} />
        </View>

        <Text style={styles.sectionTitle}>Invite Friends</Text>
        <TouchableOpacity style={styles.inviteCard}>
          <View style={styles.inviteIconContainer}>
            <UsersIcon size={24} color={tokens.colors.neutral.gray700} />
          </View>
          <View style={styles.inviteContent}>
            <Text style={styles.inviteTitle}>
              {PROFILE_SECTIONS.inviteFriends.title}
            </Text>
            <Text style={styles.inviteDescription}>
              {PROFILE_SECTIONS.inviteFriends.description}
            </Text>
          </View>
          <ChevronRight size={24} color={tokens.colors.neutral.gray400} />
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.section}>
          {PROFILE_SECTIONS.account.map((item, index) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                index === PROFILE_SECTIONS.account.length - 1 && styles.lastMenuItem,
              ]}
              onPress={() => handleNavigate(item.route as keyof ProfileStackParamList | null)}
            >
              <View style={styles.menuItemLeft}>
                {getIcon(item.icon)}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight size={20} color={tokens.colors.neutral.gray400} />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Goals & Tracking</Text>
        <View style={styles.section}>
          {PROFILE_SECTIONS.goalsTracking.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                {getIcon(item.icon)}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <View style={styles.connectedBadge}>
                <Check size={14} color={tokens.colors.semantic.success} />
                <Text style={styles.connectedText}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: tokens.colors.neutral.gray50,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: tokens.spacing[4],
    paddingTop: tokens.spacing[4],
    paddingBottom: tokens.spacing[3],
  },
  headerTitle: {
    fontSize: tokens.typography.fontSize['3xl'],
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.neutral.gray900,
  },
  userCard: {
    backgroundColor: tokens.colors.neutral.white,
    marginHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
    padding: tokens.spacing[4],
    borderRadius: tokens.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...tokens.shadows.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4169E1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing[3],
  },
  avatarText: {
    fontSize: tokens.typography.fontSize['2xl'],
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.neutral.white,
  },
  userDetails: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: tokens.spacing[1],
  },
  crownIcon: {
    marginRight: 4,
  },
  premiumBadge: {
    fontSize: tokens.typography.fontSize.sm,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.neutral.gray600,
  },
  userName: {
    fontSize: tokens.typography.fontSize.xl,
    fontWeight: tokens.typography.fontWeight.bold,
    color: tokens.colors.neutral.gray900,
    marginBottom: 2,
  },
  userHandle: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.neutral.gray500,
  },
  sectionTitle: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.neutral.gray500,
    marginHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[3],
    marginTop: tokens.spacing[2],
  },
  inviteCard: {
    backgroundColor: tokens.colors.neutral.white,
    marginHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
    padding: tokens.spacing[4],
    borderRadius: tokens.borderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    ...tokens.shadows.sm,
  },
  inviteIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: tokens.colors.neutral.gray100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: tokens.spacing[3],
  },
  inviteContent: {
    flex: 1,
  },
  inviteTitle: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.semibold,
    color: tokens.colors.neutral.gray900,
    marginBottom: 4,
  },
  inviteDescription: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.neutral.gray500,
    lineHeight: 18,
  },
  section: {
    backgroundColor: tokens.colors.neutral.white,
    marginHorizontal: tokens.spacing[4],
    marginBottom: tokens.spacing[4],
    borderRadius: tokens.borderRadius.lg,
    ...tokens.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: tokens.spacing[4],
    borderBottomWidth: 1,
    borderBottomColor: tokens.colors.neutral.gray100,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemText: {
    fontSize: tokens.typography.fontSize.base,
    fontWeight: tokens.typography.fontWeight.medium,
    color: tokens.colors.neutral.gray900,
    marginLeft: tokens.spacing[3],
  },
  connectedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  connectedText: {
    fontSize: tokens.typography.fontSize.sm,
    color: tokens.colors.neutral.gray600,
    marginLeft: 4,
  },
  bottomSpacing: {
    height: tokens.spacing[8],
  },
});

export default ProfileScreen;
