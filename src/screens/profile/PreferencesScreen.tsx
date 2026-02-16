import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    Switch,
    Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ArrowLeft, Settings, ChevronDown, Check, X } from 'lucide-react-native';
import { tokens } from '../../theme/tokens';
import { ProfileStackParamList } from '../../features/meal/types';

type PreferencesScreenNavigationProp = NativeStackNavigationProp<
    ProfileStackParamList,
    'Preferences'
>;

const PreferencesScreen: React.FC = () => {
    const navigation = useNavigation<PreferencesScreenNavigationProp>();
    const [appearance, setAppearance] = useState<'light' | 'dark' | 'system'>('light');
    const [appearanceModalVisible, setAppearanceModalVisible] = useState(false);
    const [addBurnedCalories, setAddBurnedCalories] = useState(true);
    const [rolloverCalories, setRolloverCalories] = useState(true);
    const [badgeCelebrations, setBadgeCelebrations] = useState(true);

    const handleBack = () => {
        navigation.goBack();
    };

    const handleSelectAppearance = (value: 'light' | 'dark' | 'system') => {
        setAppearance(value);
        setAppearanceModalVisible(false);
    };

    const getAppearanceLabel = () => {
        switch (appearance) {
            case 'light':
                return 'Light';
            case 'dark':
                return 'Dark';
            case 'system':
                return 'System';
            default:
                return 'Light';
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={tokens.colors.neutral.white} />

            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                    <ArrowLeft size={24} color={tokens.colors.neutral.gray900} />
                </TouchableOpacity>
                <View style={styles.headerTitleContainer}>
                    <Settings size={24} color={tokens.colors.neutral.gray900} />
                    <Text style={styles.headerTitle}>Preferences</Text>
                </View>
                <View style={styles.headerRight} />
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Appearance</Text>
                    <Text style={styles.sectionDescription}>
                        Choose light, dark, or system appearance
                    </Text>
                    <TouchableOpacity
                        style={styles.appearanceSelector}
                        onPress={() => setAppearanceModalVisible(true)}
                    >
                        <Text style={styles.appearanceValue}>{getAppearanceLabel()}</Text>
                        <ChevronDown size={20} color={tokens.colors.neutral.gray400} />
                    </TouchableOpacity>
                </View>

                <View style={styles.section}>
                    <View style={styles.preferenceItem}>
                        <View style={styles.preferenceContent}>
                            <Text style={styles.preferenceTitle}>Add Burned Calories</Text>
                            <Text style={styles.preferenceDescription}>
                                Add burned calories to daily goal
                            </Text>
                        </View>
                        <Switch
                            value={addBurnedCalories}
                            onValueChange={setAddBurnedCalories}
                            trackColor={{
                                false: tokens.colors.neutral.gray600,
                                true: '#4ADE80',
                            }}
                            thumbColor={tokens.colors.neutral.white}
                            ios_backgroundColor={tokens.colors.neutral.gray600}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.preferenceItem}>
                        <View style={styles.preferenceContent}>
                            <Text style={styles.preferenceTitle}>Rollover calories</Text>
                            <Text style={styles.preferenceDescription}>
                                Add up to 200 left over calories from yesterday into today's daily goal
                            </Text>
                        </View>
                        <Switch
                            value={rolloverCalories}
                            onValueChange={setRolloverCalories}
                            trackColor={{
                                false: tokens.colors.neutral.gray600,
                                true: '#4ADE80',
                            }}
                            thumbColor={tokens.colors.neutral.white}
                            ios_backgroundColor={tokens.colors.neutral.gray600}
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <View style={styles.preferenceItem}>
                        <View style={styles.preferenceContent}>
                            <Text style={styles.preferenceTitle}>Badge Celebrations</Text>
                            <Text style={styles.preferenceDescription}>
                                Show celebrations when you unlock new badges
                            </Text>
                        </View>
                        <Switch
                            value={badgeCelebrations}
                            onValueChange={setBadgeCelebrations}
                            trackColor={{
                                false: tokens.colors.neutral.gray600,
                                true: '#4ADE80',
                            }}
                            thumbColor={tokens.colors.neutral.white}
                            ios_backgroundColor={tokens.colors.neutral.gray600}
                        />
                    </View>
                </View>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            <Modal
                visible={appearanceModalVisible}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setAppearanceModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Choose Appearance</Text>
                            <TouchableOpacity onPress={() => setAppearanceModalVisible(false)}>
                                <X size={24} color={tokens.colors.neutral.gray600} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={[
                                styles.appearanceOption,
                                appearance === 'light' && styles.selectedAppearanceOption,
                            ]}
                            onPress={() => handleSelectAppearance('light')}
                        >
                            <Text
                                style={[
                                    styles.appearanceOptionText,
                                    appearance === 'light' && styles.selectedAppearanceOptionText,
                                ]}
                            >
                                Light
                            </Text>
                            {appearance === 'light' && (
                                <Check size={20} color={tokens.colors.neutral.white} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.appearanceOption,
                                appearance === 'dark' && styles.selectedAppearanceOption,
                            ]}
                            onPress={() => handleSelectAppearance('dark')}
                        >
                            <Text
                                style={[
                                    styles.appearanceOptionText,
                                    appearance === 'dark' && styles.selectedAppearanceOptionText,
                                ]}
                            >
                                Dark
                            </Text>
                            {appearance === 'dark' && (
                                <Check size={20} color={tokens.colors.neutral.white} />
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.appearanceOption,
                                appearance === 'system' && styles.selectedAppearanceOption,
                            ]}
                            onPress={() => handleSelectAppearance('system')}
                        >
                            <Text
                                style={[
                                    styles.appearanceOptionText,
                                    appearance === 'system' && styles.selectedAppearanceOptionText,
                                ]}
                            >
                                System
                            </Text>
                            {appearance === 'system' && (
                                <Check size={20} color={tokens.colors.neutral.white} />
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: tokens.colors.neutral.gray50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[3],
        backgroundColor: tokens.colors.neutral.white,
        borderBottomWidth: 1,
        borderBottomColor: tokens.colors.neutral.gray100,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing[2],
    },
    headerTitle: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.neutral.gray900,
    },
    headerRight: {
        width: 40,
    },
    scrollView: {
        flex: 1,
    },
    section: {
        backgroundColor: tokens.colors.neutral.white,
        marginHorizontal: tokens.spacing[4],
        marginTop: tokens.spacing[3],
        paddingHorizontal: tokens.spacing[4],
        paddingVertical: tokens.spacing[4],
        borderRadius: tokens.borderRadius.xl,
        ...tokens.shadows.sm,
    },
    sectionTitle: {
        fontSize: tokens.typography.fontSize.lg,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray900,
        marginBottom: tokens.spacing[1],
    },
    sectionDescription: {
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.neutral.gray500,
        marginBottom: tokens.spacing[3],
    },
    appearanceSelector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: tokens.colors.neutral.gray100,
        paddingVertical: tokens.spacing[3],
        paddingHorizontal: tokens.spacing[4],
        borderRadius: tokens.borderRadius.lg,
    },
    appearanceValue: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.medium,
        color: tokens.colors.neutral.gray900,
    },
    preferenceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: tokens.spacing[4],
    },
    preferenceContent: {
        flex: 1,
    },
    preferenceTitle: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray900,
        marginBottom: tokens.spacing[1],
    },
    preferenceDescription: {
        fontSize: tokens.typography.fontSize.sm,
        color: tokens.colors.neutral.gray500,
        lineHeight: 18,
    },
    bottomSpacing: {
        height: tokens.spacing[8],
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: tokens.spacing[4],
    },
    modalContent: {
        backgroundColor: tokens.colors.neutral.white,
        borderRadius: tokens.borderRadius.xl,
        padding: tokens.spacing[6],
        width: '100%',
        maxWidth: 400,
        ...tokens.shadows.lg,
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: tokens.spacing[5],
    },
    modalTitle: {
        fontSize: tokens.typography.fontSize.xl,
        fontWeight: tokens.typography.fontWeight.bold,
        color: tokens.colors.neutral.gray900,
    },
    appearanceOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: tokens.colors.neutral.gray100,
        paddingVertical: tokens.spacing[4],
        paddingHorizontal: tokens.spacing[5],
        borderRadius: tokens.borderRadius.xl,
        marginBottom: tokens.spacing[3],
    },
    selectedAppearanceOption: {
        backgroundColor: tokens.colors.neutral.gray900,
    },
    appearanceOptionText: {
        fontSize: tokens.typography.fontSize.base,
        fontWeight: tokens.typography.fontWeight.semibold,
        color: tokens.colors.neutral.gray900,
    },
    selectedAppearanceOptionText: {
        color: tokens.colors.neutral.white,
    },
});

export default PreferencesScreen;
